import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProductById = createAsyncThunk(
  'product/getProductById',
  async id => {
    const response = await fetch(
      `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
    );
    const data = await response.json();
    return data.content;
  },
);
