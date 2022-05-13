import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: null
  },
  reducers: {
    deleteUser: (state) => {
      state.value = null;
    },
    storeUser: (state, action) => {
      state.value = action.payload;
    },
    updateUserFields: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    }
  }
})

export const { storeUser, deleteUser, updateUserFields } = userSlice.actions;
export const selectUser = state => state.user.value;

export default userSlice.reducer;