import { createSlice } from '@reduxjs/toolkit';
import axios from '../axios';
const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export const getUser = (state) => state.userInfo.user;

export default userSlice.reducer;

export const handleLogin = (token) => {
  return async (dipatch) => {
    const response = await axios.get('/user/data', {
      headers: {
        Authorization: token,
      },
    });
    dipatch(setUser(response.data));
  };
};
