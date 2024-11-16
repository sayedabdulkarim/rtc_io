import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  remoteStreams: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
  isUserJoinedWithOnlyAudio: false,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    openRoom: (state, action) => {
      state.isUserInRoom = action.payload.isUserInRoom;
      state.isUserRoomCreator = action.payload.isUserRoomCreator;
    },
    setRoomDetails: (state, action) => {
      state.roomDetails = action.payload;
    },
    setActiveRooms: (state, action) => {
      state.activeRooms = action.payload;
    },
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    setAudioOnly: (state, action) => {
      state.audioOnly = action.payload;
    },
    setRemoteStreams: (state, action) => {
      state.remoteStreams = action.payload;
    },
    setScreenSharingStream: (state, action) => {
      state.screenSharingStream = action.payload.stream;
      state.isScreenSharingActive = !!action.payload.stream;
    },
    setIsUserJoinedWithOnlyAudio: (state, action) => {
      state.isUserJoinedWithOnlyAudio = action.payload;
    },
  },
});

// Export actions
export const {
  openRoom,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
  setAudioOnly,
  setRemoteStreams,
  setScreenSharingStream,
  setIsUserJoinedWithOnlyAudio,
} = roomSlice.actions;

// Export reducer
export default roomSlice.reducer;
