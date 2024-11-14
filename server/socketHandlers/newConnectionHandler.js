const serverStore = require("../serverStore");
const friendsUpdate = require("../socketHandlers/updates/friends");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  // Add the user to the server store of connected users
  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  // Make the user join a room named after their userId
  socket.join(userDetails.userId);
  console.log(`User with ID ${userDetails.userId} has joined their own room`);

  // Update pending friends invitations list
  friendsUpdate.updateFriendsPendingInvitations(userDetails.userId);

  // Update friends list
  friendsUpdate.updateFriends(userDetails.userId);
};

module.exports = newConnectionHandler;

/////======OLD ONE////
// const serverStore = require("../serverStore");
// const friendsUpdate = require("../socketHandlers/updates/friends");

// const newConnectionHandler = async (socket, io) => {
//   const userDetails = socket.user;

//   serverStore.addNewConnectedUser({
//     socketId: socket.id,
//     userId: userDetails.userId,
//   });

//   // update pending friends invitations list
//   friendsUpdate.updateFriendsPendingInvitations(userDetails.userId);

//   // update friends list
//   friendsUpdate.updateFriends(userDetails.userId);
// };

// module.exports = newConnectionHandler;
