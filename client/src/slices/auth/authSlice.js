import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "auth",
  usersList: [],
  // userInfo: true,
  userDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload, " setCredentialssss");
      state.userInfo = action.payload;
      state.userDetails = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
