import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "../../../../shared/components/Avatar";
import { joinRoom } from "../../../../realtimeCommunication/roomHandler";
import { useDispatch } from "react-redux";
// import Avatar from "../../shared/components/Avatar";
// import * as roomHandler from "../../realtimeCommunication/roomHandler";

const ActiveRoomButton = ({
  creatorUsername,
  roomId,
  amountOfParticipants,
  isUserInRoom,
}) => {
  const dispatch = useDispatch();

  const handleJoinActiveRoom = () => {
    console.log("joinRoom called");
    if (amountOfParticipants < 4) {
      joinRoom(roomId, dispatch);
      // roomHandler.joinRoom(roomId);
    }
  };

  const activeRoomButtonDisabled = amountOfParticipants > 3;
  const roomTitle = `Cretor: ${creatorUsername}. Connected: ${amountOfParticipants}`;

  return (
    <Tooltip title={roomTitle}>
      <div>
        <Button
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
          disabled={activeRoomButtonDisabled || isUserInRoom}
          onClick={handleJoinActiveRoom}
        >
          <Avatar username={creatorUsername} />
        </Button>
      </div>
    </Tooltip>
  );
};

export default ActiveRoomButton;
