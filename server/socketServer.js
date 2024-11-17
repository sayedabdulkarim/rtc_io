const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const directMessageHandler = require("./socketHandlers/directMessageHandler");
const directChatHistoryHandler = require("./socketHandlers/directChatHistoryHandler");
const roomCreateHandler = require("./socketHandlers/roomCreateHandler");
// const roomJoinHandler = require("./socketHandlers/roomJoinHandler");
// const roomLeaveHandler = require("./socketHandlers/roomLeaveHandler");
// const roomInitializeConnectionHandler = require("./socketHandlers/roomInitializeConnectionHandler");
// const roomSignalingDataHandler = require("./socketHandlers/roomSignalingDataHandler");

const serverStore = require("./serverStore");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  serverStore.setSocketServerInstance(io);

  io.use((socket, next) => {
    authSocket(socket, next);
  });

  const emitOnlineUsers = () => {
    const onlineUsers = serverStore.getOnlineUsers();
    io.emit("online-users", { onlineUsers });
  };

  io.on("connection", (socket) => {
    // console.log("user connected", socket.id);

    // Handle new connection (user joins their own room here)
    newConnectionHandler(socket, io);
    emitOnlineUsers();

    socket.on("direct-message", (data) => {
      directMessageHandler(socket, data);
    });

    socket.on("direct-chat-history", (data) => {
      directChatHistoryHandler(socket, data);
    });

    socket.on("typing", ({ recipientUserId }) => {
      const userId = socket.user?.userId;
      if (userId && recipientUserId) {
        // console.log(`Emitting typing event to recipient: ${recipientUserId}`);
        io.to(recipientUserId).emit("typing", { userId }); // Emit to recipient's room
      }
    });

    socket.on("stop-typing", ({ recipientUserId }) => {
      const userId = socket.user?.userId;
      if (userId && recipientUserId) {
        console.log(
          `Emitting stop-typing event to recipient: ${recipientUserId}`
        );
        io.to(recipientUserId).emit("stop-typing", { userId }); // Emit to recipient's room
      }
    });

    //room
    socket.on("room-create", () => {
      roomCreateHandler(socket);
    });

    // socket.on("room-join", (data) => {
    //   roomJoinHandler(socket, data);
    // });

    // socket.on("room-leave", (data) => {
    //   roomLeaveHandler(socket, data);
    // });

    // socket.on("conn-init", (data) => {
    //   roomInitializeConnectionHandler(socket, data);
    // });

    // socket.on("conn-signal", (data) => {
    //   roomSignalingDataHandler(socket, data);
    // });

    //room

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUsers();
  }, 1000 * 8);
};

module.exports = {
  registerSocketServer,
};
