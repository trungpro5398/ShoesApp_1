import {createSlice} from '@reduxjs/toolkit';
import {fetchProductById} from './ProductThunks';

const initialState = {
  dataProduct: [],
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState: initialState,
  reducers: {
    resetDataProduct: (state, action) => {
      state.dataProduct = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProductById.pending, (state, action) => {
        // fetch la promise ( pending, fulfilled, rejected)
        state.isLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.dataProduct.push(action.payload);
      });
  },
});

export const {resetDataProduct} = productSlice.actions;
export default productSlice.reducer;
