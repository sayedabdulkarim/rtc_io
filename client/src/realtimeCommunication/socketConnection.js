import io from "socket.io-client";
import {
  setFriends,
  setOnlineUsers,
  setPendingFriendsInvitations,
} from "../slices/friend/friendSlice";
// import {
//   setPendingFriendsInvitations,
//   setFriends,
//   setOnlineUsers,
// } from "../store/actions/friendsActions";
// import store from "../store/store";
import { updateDirectChatHistoryIfActive } from "../shared/utils/chat";

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
    console.log(pendingInvitations, " pendingInvitations");
    // store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on("friends-list", (data) => {
    const { friends } = data;
    dispatch(setFriends(friends));
    console.log(friends, " friends");
    // store.dispatch(setFriends(friends));
  });

  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    console.log(onlineUsers, " online");
    dispatch(setOnlineUsers(onlineUsers));
  });

  //
  socket.on("direct-chat-history", (data) => {
    console.log(data, ' "direct-chat-history');
    updateDirectChatHistoryIfActive(data);
  });
};

export const sendDirectMessage = (data) => {
  console.log(data);
  socket.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
  socket.emit("direct-chat-history", data);
};

export const startTyping = (recipientUserId) => {
  console.log("Emitting typing event to recipient:", recipientUserId); // Debugging log
  socket.emit("typing", { recipientUserId });
};

export const stopTyping = (recipientUserId) => {
  console.log("Emitting stop-typing event to recipient:", recipientUserId); // Debugging log
  socket.emit("stop-typing", { recipientUserId });
};

export { socket };
