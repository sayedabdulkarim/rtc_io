import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { leaveRoom } from "../../../../../realtimeCommunication/roomHandler";
import { useDispatch, useSelector } from "react-redux";
// import * as roomHandler from "../../../realtimeCommunication/roomHandler";

const CloseRoomButton = () => {
  const {
    localStream,
    isUserJoinedWithOnlyAudio,
    roomDetails,
    screenSharingStream,
  } = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();

  //
  const handleLeaveRoom = () => {
    const payload = {
      roomDetails,
      localStream,
      screenSharingStream,
    };
    // roomHandler.leaveRoom();
    leaveRoom(dispatch, payload);
  };

  return (
    <IconButton onClick={handleLeaveRoom} style={{ color: "white" }}>
      <CloseIcon />
    </IconButton>
  );
};

export default CloseRoomButton;
