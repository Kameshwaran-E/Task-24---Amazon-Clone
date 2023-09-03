import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  basket: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.basket = [...state.basket, action.payload];
    },
    removeFromBasket: (state, action) => {
      let newBasket = state.basket.filter((item) => item.id !== action.payload);
      state.basket = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.action;

export const getBasket = (state) => state.basketItem.basket;
export default basketSlice.reducer;
