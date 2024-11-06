import io from "socket.io-client";
import { setPendingFriendsInvitations } from "../slices/friend/friendSlice";
// import {
//   setPendingFriendsInvitations,
//   setFriends,
//   setOnlineUsers,
// } from "../store/actions/friendsActions";
// import store from "../store/store";

let socket = null;

export const connectWithSocketServer = (userDetails, dispatch) => {
  const jwtToken = userDetails.token;

  socket = io("http://localhost:5002", {
    auth: {
      token: jwtToken,
    },
  });
  // socket = io("http://localhost:5002");

  socket.on("connect", () => {
    console.log("succesfully connected with socket.io server");
    console.log(socket.id);
  });

  socket.on("friends-invitations", (data) => {
    const { pendingInvitations } = data;
    dispatch(setPendingFriendsInvitations(pendingInvitations));
    // store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  // socket.on("friends-list", (data) => {
  //   const { friends } = data;
  //   store.dispatch(setFriends(friends));
  // });

  // socket.on("online-users", (data) => {
  //   const { onlineUsers } = data;
  //   store.dispatch(setOnlineUsers(onlineUsers));
  // });
};
