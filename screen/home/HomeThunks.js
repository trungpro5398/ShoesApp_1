import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'product/fetchProduct',
  async () => {
    const response = await fetch('http://svcy3.myclass.vn/api/Product'); // ios k goi dc http phai mo len cho phep truy cap http
    const data = await response.json();
    return data.content;
  },
);

export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetch(
      'http://svcy3.myclass.vn/api/Product/getAllCategory',
    ); // ios k goi dc http phai mo len cho phep truy cap http
    const data = await response.json();
    return data.content;
  },
);

export const fetchProductByCategory = createAsyncThunk(
  'product/fetchProductById',
  async id => {
    const response = await fetch(
      `http://svcy3.myclass.vn/api/Product/getProductByCategory?categoryId=${id}`,
    );
    const data = await response.json();
    return data.content;
  },
);
