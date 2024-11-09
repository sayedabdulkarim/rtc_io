import React, { useState } from "react";
import { Tooltip, Typography, Box } from "@mui/material";
import InvitationDecisionButtons from "./InvitationDecisionButtons";
import Avatar from "../../../../../shared/components/Avatar";
import {
  useAcceptFriendInvitationMutation,
  useRejectFriendInvitationMutation,
} from "../../../../../slices/friend/friendApiSlice";
import { handleShowAlert } from "../../../../../shared/utils/commonHelper";
import { useDispatch } from "react-redux";

const PendingInvitationsListItem = ({
  id,
  username,
  mail,
  // acceptFriendInvitation = () => {},
  // rejectFriendInvitation = () => {},
}) => {
  //misc
  const dispatch = useDispatch();
  //query n mutation
  const [
    acceptFriendInvitation,
    {
      isSuccess: isSuccessAcceptFriendInvitation,
      isError: isErrorAcceptFriendInvitation,
      error: ErrorAcceptFriendInvitation,
    },
  ] = useAcceptFriendInvitationMutation();
  const [
    rejectFriendInvitation,
    {
      isSuccess: isSuccessRejectFriendInvitation,
      isError: isErrorRejectFriendInvitation,
      error: ErrorRejectFriendInvitation,
    },
  ] = useRejectFriendInvitationMutation();
  //state
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const handleAcceptInvitation = async () => {
    // acceptFriendInvitation({ id });
    // setButtonsDisabled(true);
    try {
      await acceptFriendInvitation({ id }).unwrap();
      setButtonsDisabled(true);
      handleShowAlert(dispatch, "success", "Invitation accepted");
      // Handle success, like showing an alert
    } catch (err) {
      // Handle error, like showing an alert
      console.error("Error Accepting invitation:", err);
      handleShowAlert(dispatch, "error", err?.data);
    }
  };

  const handleRejectInvitation = async () => {
    // rejectFriendInvitation({ id });
    // setButtonsDisabled(true);
    try {
      await rejectFriendInvitation({ id }).unwrap();
      setButtonsDisabled(true);
      handleShowAlert(dispatch, "success", "Invitation rejected.");
      // Handle success, like showing an alert
    } catch (err) {
      // Handle error, like showing an alert
      console.error("Error Rejecting invitation:", err);
      handleShowAlert(dispatch, "error", err?.data);
    }
  };

  return (
    <Tooltip title={mail}>
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            height: "42px",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar username={username} />
          <Typography
            sx={{
              marginLeft: "7px",
              fontWeight: 700,
              color: "#8e9297",
              flexGrow: 1,
            }}
            variant="subtitle1"
          >
            {username}
          </Typography>
          <InvitationDecisionButtons
            disabled={buttonsDisabled}
            acceptInvitationHandler={handleAcceptInvitation}
            rejectInvitationHandler={handleRejectInvitation}
          />
        </Box>
      </div>
    </Tooltip>
  );
};

export default PendingInvitationsListItem;
