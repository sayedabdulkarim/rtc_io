import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "auth",
  usersList: [],
  userInfo: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
