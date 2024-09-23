import React from 'react';
import axios from 'axios';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterProvider from '../components/RegisterProvider';
import { rootReducer } from '../redux/reducers/rootReducer';

const renderWithReduxAndRouter = (component, { initialState } = {}) => {
  const store = createStore(rootReducer, initialState);
  return render(
    <Provider store={store}>
      <Router>{component}</Router>
    </Provider>
  );
};

jest.mock('../redux/actions/authActions', () => ({
  register: jest.fn(),
}));

jest.mock('axios'); // Mock axios

describe('RegisterProvider Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [{ _id: '1', name: 'Test Category', services: [] }],
    });
  });

  test('renders registration form', () => {
    renderWithReduxAndRouter(<RegisterProvider />);
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mobile/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('shows validation errors on invalid input', async () => {
    renderWithReduxAndRouter(<RegisterProvider />);
    
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'ab' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/mobile/i), { target: { value: '' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/mobile number is required/i)).toBeInTheDocument();
    });
  });

  test('register button is disabled when submitting', async () => {
    renderWithReduxAndRouter(<RegisterProvider />);
    
    const button = screen.getByRole('button', { name: /register/i });

    fireEvent.click(button);
    
    expect(button).toBeDisabled();
  });

  test('dispatches register action on valid submission', async () => {
    renderWithReduxAndRouter(<RegisterProvider />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'strongpassword' } });
    fireEvent.change(screen.getByLabelText(/mobile/i), { target: { value: '1234567890' } });

    // Simulate opening the category dropdown
    fireEvent.mouseDown(screen.getByRole('button', { name: /categories/i })); // Assuming the dropdown button has this role

    // Wait for the category option to appear
    await waitFor(() => {
      expect(screen.getByText(/test category/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/test category/i));

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Check if the register action is called
    await waitFor(() => {
      expect(screen.getByText(/success message/i)).toBeInTheDocument(); // Adjust this based on your actual success behavior
    });
  });
});