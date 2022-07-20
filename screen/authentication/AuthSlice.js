import { createSlice } from '@reduxjs/toolkit';
import { KEY_LOCAL_TOKEN } from '../../common/Constant';
import { saveLocalStorage, getLocalStorage } from '../../common/LocalStorage';

import { callLogin, callSignup, getLocalAccessToken } from './AuthThunk';

const initialState = {
  loginStatus: false,
  accessToken: '',
  loginMode: true,
  signupStatus: false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.accessToken = '';
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setAuthMode: (state, action) => {
      state.loginMode = action.payload;
    },
  },
  extraReducers: builder => {
    //Only call when login or token is expired
    builder
      .addCase(callLogin.fulfilled, (state, action) => {
        // On success
        let token = action.payload.accessToken;
        saveLocalStorage(KEY_LOCAL_TOKEN, token);
        state.accessToken = token;
      })
      .addCase(callLogin.rejected, (state, action) => {
        // When login failed
        console.log(action.error);
      })
      .addCase(getLocalAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(callSignup.fulfilled, (state, action) => {
        state.signupStatus = true;
      })
      .addCase(callSignup.rejected, (state, action) => {
        state.signupStatus = false;
      });
  },
});

export const { logOut, setAuthMode } = authSlice.actions;
export default authSlice.reducer;
