import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: null
  },
  reducers: {
    storeToken: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const { storeToken } = tokenSlice.actions;
export const selectToken = state => state.token.value;

export default tokenSlice.reducer;