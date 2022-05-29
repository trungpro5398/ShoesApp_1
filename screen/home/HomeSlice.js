import {createSlice} from '@reduxjs/toolkit';

import {
  fetchProducts,
  fetchCategories,
  fetchProductByCategory,
} from './HomeThunks';
const initialState = {
  dataProducts: [],
  dataCategories: [],
  dataProductsByCategory: [],
  isClickedId: null,
};
/*
addCase trang thai tuong ung voi promise (fetch)(pending(chua load dc),fulfilled (da goi len va load dc),rejected)
*/
const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: initialState,
  reducers: {
    changeId: (state, action) => {
      state.isClickedId = action.payload.isClickedId;
    },
  }, // reducers chi la cai key
  extraReducers: builder => {
    // reducer lang nghe action
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        // fetch la promise ( pending, fulfilled, rejected)
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.dataProducts = action.payload;
      })
      .addCase(fetchCategories.pending, (state, action) => {
        // fetch la promise ( pending, fulfilled, rejected)
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.dataCategories = action.payload;
      })
      .addCase(fetchProductByCategory.pending, (state, action) => {
        // fetch la promise ( pending, fulfilled, rejected)
        state.isLoading = true;
      })
      .addCase(fetchProductByCategory.fulfilled, (state, action) => {
        state.dataProductsByCategory = action.payload;
      });
  },
});
export const {changeId} = homeSlice.actions;

export default homeSlice.reducer; // cho phep tao ra nhieu reducers khac nhau
