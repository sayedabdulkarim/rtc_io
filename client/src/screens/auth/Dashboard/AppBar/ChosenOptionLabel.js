import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

const ChosenOptionLabel = () => {
  const { chosenChatDetails } = useSelector((state) => state.chatReducer);
  return (
    <Typography
      sx={{ fontSize: "16px", color: "white", fontWeight: "bold" }}
    >{`${
      chosenChatDetails ? `Chosen conversation: ${chosenChatDetails?.name}` : ""
    }`}</Typography>
  );
};

export default ChosenOptionLabel;
