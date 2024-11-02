import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import { validateMail } from "../../../../shared/utils/validators";
import InputWithLabel from "../../../../shared/components/InputWithLabel";
import CustomPrimaryButton from "../../../../shared/components/CustomPrimaryButton";
import { useSendFriendInvitationMutation } from "../../../../slices/friend/friendApiSlice";

const AddFriendDialog = ({
  isDialogOpen,
  closeDialogHandler,
  // sendFriendInvitation = () => {},
}) => {
  //
  const [sendFriendInvitation, { isSuccess, isError, error }] =
    useSendFriendInvitationMutation();
  //state
  const [mail, setMail] = useState("");
  const [isFormValid, setIsFormValid] = useState("");

  const handleSendInvitation = async () => {
    // send friend request to server
    try {
      await sendFriendInvitation({ mail }).unwrap();
      // Handle success, like showing an alert
      console.log("Invitation sent successfully!");
    } catch (err) {
      // Handle error, like showing an alert
      console.error("Error sending invitation:", err);
    }
  };

  const handleCloseDialog = () => {
    closeDialogHandler();
    setMail("");
  };

  useEffect(() => {
    setIsFormValid(validateMail(mail));
  }, [mail, setIsFormValid]);

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography>Invite a Friend</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter e-mail address of friend which you would like to invite
            {/* <Typography>
            </Typography> */}
          </DialogContentText>
          <InputWithLabel
            label="Mail"
            type="text"
            value={mail}
            setValue={setMail}
            placeholder="Enter mail address"
          />
        </DialogContent>
        <DialogActions>
          <CustomPrimaryButton
            onClick={handleSendInvitation}
            disabled={!isFormValid}
            label="Send"
            additionalStyles={{
              marginLeft: "15px",
              marginRight: "15px",
              marginBottom: "10px",
            }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddFriendDialog;
