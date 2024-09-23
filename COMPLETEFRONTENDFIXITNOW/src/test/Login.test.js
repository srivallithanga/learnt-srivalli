import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/Login';
import { rootReducer } from '../redux/reducers/rootReducer';

const renderWithReduxAndRouter = (component, { initialState, store = createStore(rootReducer, initialState) } = {}) => {
  return {
    ...render(
      <Provider store={store}>
        <Router>{component}</Router>
      </Provider>
    ),
    store,
  };
};

test('renders login form', () => {
  renderWithReduxAndRouter(<Login />);
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('shows error message on invalid login', async () => {
  renderWithReduxAndRouter(<Login />);
  
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wrongUser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongPass' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  // Assuming you have some way to trigger the login error
  // This part may need to be adjusted based on your actual error handling
  expect(await screen.findByText(/wrong username or password/i)).toBeInTheDocument();
});

test('remember me checkbox works', () => {
  renderWithReduxAndRouter(<Login />);
  
  const checkbox = screen.getByLabelText(/remember me/i);
  fireEvent.click(checkbox);
  
  expect(checkbox).toBeChecked();
});
