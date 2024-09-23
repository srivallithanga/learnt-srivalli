import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterConsumer from '../components/RegisterConsumer';
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

test('renders registration form', () => {
  renderWithReduxAndRouter(<RegisterConsumer />);
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/mobile/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
});

test('shows validation errors on invalid input', async () => {
  renderWithReduxAndRouter(<RegisterConsumer />);
  
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'ab' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
  fireEvent.change(screen.getByLabelText(/mobile/i), { target: { value: '123' } });
  
  fireEvent.click(screen.getByRole('button', { name: /register/i }));

  expect(await screen.findByText(/username must be at least 3 characters/i)).toBeInTheDocument();
  expect(await screen.findByText(/password must be at least 6 characters/i)).toBeInTheDocument();
  expect(await screen.findByText(/mobile number must be exactly 10 digits/i)).toBeInTheDocument();
});

test('register button is disabled when submitting', () => {
  renderWithReduxAndRouter(<RegisterConsumer />);
  
  const button = screen.getByRole('button', { name: /register/i });
  fireEvent.click(button);
  
  expect(button).toBeDisabled();
});
