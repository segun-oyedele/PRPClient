import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    increment: (state, /* action */) => {
      state.value += 1
    },
  },
});

export const { increment } = reportsSlice.actions;

export default reportsSlice.reducer;