import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import {
  sendDirectMessage,
  startTyping,
  stopTyping,
  socket, // Import the socket instance
} from "../../../../realtimeCommunication/socketConnection";

const MainContainer = styled("div")({
  height: "60px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
});

const Input = styled("input")({
  backgroundColor: "#2f3136",
  width: "98%",
  height: "44px",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  padding: "0 10px",
});

const TypingIndicator = styled("div")({
  position: "absolute",
  bottom: "10px",
  fontSize: "12px",
  color: "gray",
});

const NewMessageInput = () => {
  const { chosenChatDetails } = useSelector((state) => state.chatReducer);
  const [message, setMessage] = useState("");
  const [isRecipientTyping, setIsRecipientTyping] = useState(false); // Changed to isRecipientTyping
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    console.log("Setting up socket listeners for typing events");

    socket.on("typing", ({ userId }) => {
      console.log(
        "Received typing event from:",
        userId,
        "Expected recipient:",
        chosenChatDetails.id
      ); // Debugging log
      if (userId === chosenChatDetails.id) {
        setIsRecipientTyping(true);
        console.log("Setting isRecipientTyping to true");
      }
    });

    socket.on("stop-typing", ({ userId }) => {
      console.log(
        "Received stop-typing event from:",
        userId,
        "Expected recipient:",
        chosenChatDetails.id
      ); // Debugging log
      if (userId === chosenChatDetails.id) {
        setIsRecipientTyping(false);
        console.log("Setting isRecipientTyping to false");
      }
    });

    // Clean up listeners on component unmount
    return () => {
      socket.off("typing");
      socket.off("stop-typing");
    };
  }, [chosenChatDetails.id]);

  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);

    // Emit startTyping event when typing begins
    if (event.target.value.length > 0) {
      startTyping(chosenChatDetails.id);
    }

    // Clear the previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set a new timeout to send stopTyping after 1 second of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping(chosenChatDetails.id);
    }, 1000);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: message,
      });
      setMessage("");
      stopTyping(chosenChatDetails.id);
    }
  };

  console.log(isRecipientTyping, " isRecipientTyping");
  return (
    <MainContainer>
      <Input
        placeholder={`Write message to ${chosenChatDetails.name}`}
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
      />
      {isRecipientTyping && (
        <TypingIndicator>{`${chosenChatDetails.name} is typing...`}</TypingIndicator>
      )}
    </MainContainer>
  );
};

export default NewMessageInput;
