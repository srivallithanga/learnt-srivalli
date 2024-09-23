import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import VerificationForm from '../components/VerificationForm';
import { rootReducer } from '../redux/reducers/rootReducer';

const renderWithReduxAndRouter = (component, { initialState } = {}) => {
  const store = createStore(rootReducer, initialState);
  return render(
    <Provider store={store}>
      <Router>{component}</Router>
    </Provider>
  );
};

describe('VerificationForm Component', () => {
  test('renders the form with initial elements', () => {
    renderWithReduxAndRouter(<VerificationForm />);
    
    expect(screen.getByText(/verification form/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /upload images/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /verify otp/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('shows a message when images are uploaded', async () => {
    renderWithReduxAndRouter(<VerificationForm />);
    
    const input = screen.getByLabelText(/select images from device/i);
    const file = new File(['sample image'], 'sample.png', { type: 'image/png' });

    fireEvent.change(input, { target: { files: [file] } });
    
    expect(screen.getByText(/before/i)).toBeInTheDocument();
  });

  test('verifies OTP when all fields are filled', async () => {
    renderWithReduxAndRouter(<VerificationForm />);
    
    const otpInputs = screen.getAllByRole('textbox');
    otpInputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: '1' } }); 
    });

    fireEvent.click(screen.getByRole('button', { name: /verify otp/i }));
    expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled(); 
  });
});
