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
  setActiveRooms,
  setIsUserJoinedWithOnlyAudio,
  setLocalStream,
  setRemoteStreams,
  setRoomDetails,
  setScreenSharingStream,
} from "../slices/room/roomSlice";
import store from "../store";

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
    // const audioOnly = getState.audioOnly;
    const audioOnly = store.getState().roomReducer.audioOnly;
    dispatch(setIsUserJoinedWithOnlyAudio(audioOnly));

    // Trigger socket connection to create a new room
    socketConnection.createNewRoom();
  };

  // Get the audio-only setting from the store
  // const audioOnly = getState.audioOnly;
  const audioOnly = store.getState().roomReducer.audioOnly;

  // Start the local stream preview
  webRTCHandler.getLocalStreamPreview(dispatch, audioOnly, successCallbackFunc);
};

export const newRoomCreated = (data, dispatch) => {
  const { roomDetails } = data;
  console.log(data, "newRoomCreated");
  dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data, getState, dispatch) => {
  const { activeRooms } = data;

  const friends = store.getState().friendReducer.friends;
  console.log(
    {
      data,
      getState,
      friends,
    },
    " updateActiveRooms"
  );
  const rooms = [];

  const userId = getState.userDetails?._id;

  activeRooms.forEach((room) => {
    const isRoomCreatedByMe = room.roomCreator.userId === userId;

    if (isRoomCreatedByMe) {
      rooms.push({ ...room, creatorUsername: "Me" });
    } else {
      friends.forEach((f) => {
        if (f.id === room.roomCreator.userId) {
          rooms.push({ ...room, creatorUsername: f.username });
        }
      });
    }
  });

  dispatch(setActiveRooms(rooms));
};

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

export const joinRoom = (roomId, dispatch) => {
  console.log(roomId, " joinRoom from room handler");
  const successCalbackFunc = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(openRoom(false, true));
    const audioOnly = store.getState().roomReducer.audioOnly;
    store.dispatch(setIsUserJoinedWithOnlyAudio(audioOnly));
    socketConnection.joinRoom({ roomId });
  };

  const audioOnly = store.getState().roomReducer.audioOnly;
  webRTCHandler.getLocalStreamPreview(dispatch, audioOnly, successCalbackFunc);
};

export const leaveRoom = (dispatch, getState) => {
  // const roomId = getState.roomDetails.roomId;
  const roomId = store.getState().roomReducer.roomDetails.roomId;

  const localStream = store.getState().roomReducer.localStream;
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setLocalStream(null));
  }

  // const screenSharingStream = getState.screenSharingStream;
  const screenSharingStream = store.getState().roomReducer.screenSharingStream;
  if (screenSharingStream) {
    screenSharingStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setScreenSharingStream(null));
  }

  store.dispatch(setRemoteStreams([]));
  webRTCHandler.closeAllConnections();

  socketConnection.leaveRoom({ roomId });
  store.dispatch(setRoomDetails(null));
  store.dispatch(openRoom(false, false));
};
