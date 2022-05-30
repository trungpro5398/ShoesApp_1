import {configureStore} from '@reduxjs/toolkit';
import HomeReducer from './screen/home/HomeSlice'; // export default co the sua ten function

import AuthReducer from './screen/authentication/AuthSlice'

export const store = configureStore({
  reducer: {
    home: HomeReducer,
    auth: AuthReducer
  },
});
