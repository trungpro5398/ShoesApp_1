import {configureStore} from '@reduxjs/toolkit';
import HomeReducer from './screen/home/HomeSlice'; // export default co the sua ten function
import ProductReducer from './screen/product/ProductSlice';
export const store = configureStore({
  reducer: {
    home: HomeReducer,
    product: ProductReducer,
  },
});
