import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "auth",
  usersList: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
