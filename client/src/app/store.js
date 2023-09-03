import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import basketReducer from '../slices/basketSlice';
const store = configureStore({
  reducer: {
    userInfo: userReducer,
    basketItem: basketReducer,
  },
});

export default store;
