import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  dataProducts: [],
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      let isInside = false;
      state.dataProducts.forEach(item => {
        if (item.id == action.payload.id && item.size == action.payload.size)
          isInside = true;
      });
      if (isInside) {
        state.dataProducts.map(item =>
          item.id == action.payload.id && item.size == action.payload.size
            ? (item.amount = action.payload.amount)
            : item,
        );
      } else {
        state.dataProducts.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      console.log(action.payload, state.dataProducts);
      state.dataProducts = state.dataProducts.filter(
        item =>
          item.id !== action.payload.id || item.size !== action.payload.size,
      );
    },
  },
});

export const {addToCart, removeFromCart, totalAmountFromCart} =
  cartSlice.actions;
export default cartSlice.reducer;
