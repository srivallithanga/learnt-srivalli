import { UPDATE_CART_COUNT, RESET_CART_COUNT } from '../actionTypes/cartActionTypes';

// Action to update cart count
export const updateCartCount = (count) => ({
    type: UPDATE_CART_COUNT,
    payload: count,
});

// Action to reset cart count
export const resetCartCount = () => ({
    type: RESET_CART_COUNT,
});

// Action to add booking details
export const addBookingDetails = (details) => ({
    type: 'ADD_BOOKING_DETAILS',
    payload: details,
});
