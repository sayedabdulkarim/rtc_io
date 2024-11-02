import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
};

const friendSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    setPendingFriendsInvitations: (state, action) => {
      state.pendingFriendsInvitations = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setFriends, setPendingFriendsInvitations, setOnlineUsers } =
  friendSlice.actions;

export default friendSlice.reducer;
