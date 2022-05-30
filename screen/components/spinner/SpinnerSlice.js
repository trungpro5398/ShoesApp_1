import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
};

const spinnerSlice = createSlice({
  name: 'spinnerSlice',
  initialState: initialState,
  reducers: {
    changeLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {changeLoading} = spinnerSlice.actions;

export default spinnerSlice.reducer;
