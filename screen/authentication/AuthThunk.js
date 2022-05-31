import {createAsyncThunk} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {KEY_LOCAL_TOKEN} from '../../common/Constant';
import {getLocalStorage} from '../../common/LocalStorage';

export const callLogin = createAsyncThunk('User/login', async user => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  const res = await fetch('http://svcy3.myclass.vn/api/Users/signin', options);
  const json = await res.json();

  //Catch login failed
  if (!res.ok) {
    return Promise.reject(json.message);
  }

  console.log(json.message);
  return json.content;
});

export const getLocalAccessToken = createAsyncThunk(
  'Local/AcessToken',
  async () => {
    let token = await getLocalStorage(KEY_LOCAL_TOKEN);
    if (token == undefined || token == '') {
      return '';
    }

    return token;
  },
);

export const callSignup = createAsyncThunk('User/signup', async user => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  const res = await fetch('http://svcy3.myclass.vn/api/Users/signup', options);
  const json = await res.json();

  //Catch signup failed
  if (!res.ok) {
    return Promise.reject(json.message);
  }

  console.log(json.message);

  return json.content;
});
