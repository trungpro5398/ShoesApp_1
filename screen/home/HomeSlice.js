import {createSlice} from '@reduxjs/toolkit';

import {
  fetchProducts,
  fetchCategories,
  fetchProductByCategory,
  fetchProductFavorite,
  fetchUserLike,
  fetchUserUnLike,
} from './HomeThunks';
const initialState = {
  dataProducts: [],
  dataCategories: [],
  dataProductsByCategory: [],
  isClickedId: null,
  isClickedProductId: null,
  favoritedProducts: [],
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
    changeProductId: (state, action) => {
      state.isClickedProductId = action.payload.isClickedProductId;
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
        // fetch la promise ( pending, fulfilled, rejected) abc
        state.isLoading = true;
      })
      .addCase(fetchProductByCategory.fulfilled, (state, action) => {
        state.dataProductsByCategory = action.payload;
      })
      .addCase(fetchUserLike.pending, (state, action) => {
        // fetch la promise ( pending, fulfilled, rejected)
        state.isLoading = true;
      })
      .addCase(fetchUserLike.fulfilled, (state, action) => {})
      .addCase(fetchUserUnLike.pending, (state, action) => {
        // fetch la promise ( pending, fulfilled, rejected)
        state.isLoading = true;
      })
      .addCase(fetchUserUnLike.fulfilled, (state, action) => {})
      .addCase(fetchProductFavorite.pending, (state, action) => {
        isLoading = true;
      })
      .addCase(fetchProductFavorite.fulfilled, (state, action) => {
        state.favoritedProducts = action.payload.map(item => item.id);
      });
  },
});
export const {changeId, changeProductId} = homeSlice.actions;

export default homeSlice.reducer; // cho phep tao ra nhieu reducers khac nhau
