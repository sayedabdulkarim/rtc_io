// import store from "../store/store";
// import {
//   setOpenRoom,
//   setRoomDetails,
//   setActiveRooms,
//   setLocalStream,
//   setRemoteStreams,
//   setScreenSharingStream,
//   setIsUserJoinedOnlyWithAudio,
// } from "../store/actions/roomActions";
import * as socketConnection from "./socketConnection";
import * as webRTCHandler from "./webRTCHandler";
import {
  openRoom,
  setIsUserJoinedWithOnlyAudio,
  setLocalStream,
  setRemoteStreams,
  setRoomDetails,
  setScreenSharingStream,
} from "../slices/room/roomSlice";

// export const createNewRoom = () => {
//   const successCalbackFunc = () => {
//     store.dispatch(setOpenRoom(true, true));

//     const audioOnly = store.getState().room.audioOnly;
//     store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
//     socketConnection.createNewRoom();
//   };

//   const audioOnly = store.getState().room.audioOnly;
//   webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
// };

export const createNewRoom = (dispatch, getState) => {
  const successCallbackFunc = () => {
    // Dispatch actions using the updated slice
    dispatch(openRoom({ isUserInRoom: true, isUserRoomCreator: true }));

    //TODO: grab getState from selector
    const audioOnly = getState.audioOnly;
    dispatch(setIsUserJoinedWithOnlyAudio(audioOnly));

    // Trigger socket connection to create a new room
    socketConnection.createNewRoom();
  };

  // Get the audio-only setting from the store
  const audioOnly = getState.audioOnly;

  // Start the local stream preview
  webRTCHandler.getLocalStreamPreview(dispatch, audioOnly, successCallbackFunc);
};

// export const newRoomCreated = (data) => {
//   const { roomDetails } = data;
//   store.dispatch(setRoomDetails(roomDetails));
// };

// export const updateActiveRooms = (data) => {
//   const { activeRooms } = data;

//   const friends = store.getState().friends.friends;
//   const rooms = [];

//   const userId = store.getState().auth.userDetails?._id;

//   activeRooms.forEach((room) => {
//     const isRoomCreatedByMe = room.roomCreator.userId === userId;

//     if (isRoomCreatedByMe) {
//       rooms.push({ ...room, creatorUsername: "Me" });
//     } else {
//       friends.forEach((f) => {
//         if (f.id === room.roomCreator.userId) {
//           rooms.push({ ...room, creatorUsername: f.username });
//         }
//       });
//     }
//   });

//   store.dispatch(setActiveRooms(rooms));
// };

// export const joinRoom = (roomId) => {
//   const successCalbackFunc = () => {
//     store.dispatch(setRoomDetails({ roomId }));
//     store.dispatch(setOpenRoom(false, true));
//     const audioOnly = store.getState().room.audioOnly;
//     store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
//     socketConnection.joinRoom({ roomId });
//   };

//   const audioOnly = store.getState().room.audioOnly;
//   webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
// };

export const leaveRoom = (dispatch, getState) => {
  const roomId = getState.roomDetails.roomId;

  const localStream = getState.localStream;
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    dispatch(setLocalStream(null));
  }

  const screenSharingStream = getState.screenSharingStream;
  if (screenSharingStream) {
    screenSharingStream.getTracks().forEach((track) => track.stop());
    dispatch(setScreenSharingStream(null));
  }

  dispatch(setRemoteStreams([]));
  webRTCHandler.closeAllConnections();

  socketConnection.leaveRoom({ roomId });
  dispatch(setRoomDetails(null));
  dispatch(openRoom(false, false));
};
