import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import listingReducer from './slices/listingSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/login/fulfilled'],
        ignoredPaths: ['auth.user']
      }
    })
});

export default store;