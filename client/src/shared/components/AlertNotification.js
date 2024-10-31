import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const AlertNotification = ({
  type,
  showAlertMessage,
  closeAlertMessage,
  alertMessageContent,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={showAlertMessage ?? ""}
      // onClose={closeAlertMessage ?? ""}
      autoHideDuration={6000}
      severity={type ?? ""}
      variant="filled"
      sx={{ width: "100%" }}
    >
      <Alert severity={type ?? ""}>{alertMessageContent}</Alert>
    </Snackbar>
  );
};

export default AlertNotification;
