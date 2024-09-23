import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from './Cart'; // Adjust the import path as necessary

describe('Cart Component', () => {
  beforeEach(() => {
    render(<Cart />);
  });

  test('renders booking summary heading', () => {
    const heading = screen.getByText(/Booking Summary/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders "No booking details available" when bookingDetails is null', () => {
    const noBookingDetailsMessage = screen.getByText(/No booking details available/i);
    expect(noBookingDetailsMessage).toBeInTheDocument();
  });

  test('renders address section', () => {
    const addressHeading = screen.getByText(/Address/i);
    expect(addressHeading).toBeInTheDocument();
  });

  test('renders payment options section', () => {
    const paymentHeading = screen.getByText(/Payment Options/i);
    expect(paymentHeading).toBeInTheDocument();
  });

  test('button is disabled initially', () => {
    const paymentButton = screen.getByRole('button', { name: /Make Payment/i });
    expect(paymentButton).toBeDisabled();
  });

  test('can click "Add Address" button', () => {
    const addAddressButton = screen.getByRole('button', { name: /Add Address/i });
    fireEvent.click(addAddressButton);
    expect(addAddressButton).toBeInTheDocument(); // Ensure it still exists after click
  });
});
