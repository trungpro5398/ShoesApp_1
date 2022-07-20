import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'product/fetchProduct',
  async () => {
    const response = await fetch('https://shop.cyberlearn.vn/api/Product'); // ios k goi dc http phai mo len cho phep truy cap http
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

export const fetchUserLike = createAsyncThunk(
  'product/fetchUserLike',
  async ({ id, token }) => {
    const response = await fetch(
      `https://shop.cyberlearn.vn/api/Users/like?productId=${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    console.log(data);

    return data.content;
  },
);

export const fetchUserUnLike = createAsyncThunk(
  'product/fetchUserUnLike',
  async ({ id, token }) => {
    const response = await fetch(
      `https://shop.cyberlearn.vn/api/Users/unlike?productId=${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    console.log(data);
    return data.content;
  },
);

export const fetchProductFavorite = createAsyncThunk(
  'product/fetchProductFavorite',
  async token => {
    const response = await fetch(
      `https://shop.cyberlearn.vn/api/Users/getproductfavorite`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();

    return data.content.productsFavorite;
  },
);
