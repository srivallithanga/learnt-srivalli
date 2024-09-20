import { createSelector } from 'reselect';

// Basic selector to get the user state
const selectUserState = (state) => state.user;

// Memoized selector to get user details
// selectors.js
// selectors.js
export const selectUser = (state) => state?.user?.user || null;


// Memoized selector to get user token
export const selectUserToken = createSelector(
  [selectUserState],
  (userState) => userState.token
);
