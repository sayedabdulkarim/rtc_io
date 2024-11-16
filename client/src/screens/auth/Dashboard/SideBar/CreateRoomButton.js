import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { createNewRoom } from "../../../../realtimeCommunication/roomHandler";
import { useDispatch, useSelector } from "react-redux";

const CreateRoomButton = ({ isUserInRoom }) => {
  const dispatch = useDispatch();
  const { audioOnly } = useSelector((state) => state.roomReducer);
  //
  const createNewRoomHandler = () => {
    const payload = { audioOnly };
    console.log("createNewRoom called");
    createNewRoom(dispatch, payload);
  };

  return (
    <Button
      disabled={isUserInRoom}
      onClick={createNewRoomHandler}
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "16px",
        margin: 0,
        padding: 0,
        minWidth: 0,
        marginTop: "10px",
        color: "white",
        backgroundColor: "#5865F2",
      }}
    >
      <AddIcon />
    </Button>
  );
};

export default CreateRoomButton;
