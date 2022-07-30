import { createSlice } from '@reduxjs/toolkit';
import { placeOrder } from './CartThunk';
const initialState = {
  dataProducts: [],
  message: ""
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

    clearCart: (state, action) => {
      console.log('Clearing cart')
      state.dataProducts = []
    },

    clearMessage: (state, action) => {
      state.message = ''
    }
  },
  extraReducers: builder => {
    builder.addCase(placeOrder.rejected, (state, action) => {
      console.log(action.payload)
      state.message = "Order failed"
    }).addCase(placeOrder.fulfilled, (state, action) => {
      console.log("Order success")
      console.log(action.payload)
      state.dataProducts = [],
        state.message = "Order success"
    })
  }
});

export const { addToCart, removeFromCart, totalAmountFromCart, clearCart, clearMessage } =
  cartSlice.actions;
export default cartSlice.reducer;
