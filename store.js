import {configureStore} from '@reduxjs/toolkit';
import HomeReducer from './screen/home/HomeSlice'; // export default co the sua ten function
import ProductReducer from './screen/product/ProductSlice';
import AutheReducer from './screen/authentication/AuthSlice';
import SpinnerReducer from './screen/components/spinner/SpinnerSlice';
import CartReducer from './screen/cart/CartSlice';
export const store = configureStore({
  reducer: {
    home: HomeReducer,
    auth: AutheReducer,
    product: ProductReducer,
    spinner: SpinnerReducer,
    cart: CartReducer,
  },
});
