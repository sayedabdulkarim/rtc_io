import { setMessages } from "../../slices/chat/chatSlice";

export const updateDirectChatHistoryIfActive = (
  data,
  dispatch,
  userDetails,
  chosenChatDetails
) => {
  const { participants, messages } = data;

  // Retrieve receiverId and userId from the state
  const receiverId = chosenChatDetails?.id;
  const userId = userDetails._id;

  console.log("Active Chat Details:", { chosenChatDetails, userDetails });
  console.log("Received Participants and Messages:", {
    participants,
    messages,
  });

  // Check if the active conversation matches the one from the data
  if (receiverId && userId) {
    const usersInConversation = [receiverId, userId];

    // Call a helper function to update chat history if the conversation matches
    updateChatHistoryIfSameConversationActive({
      participants,
      usersInConversation,
      messages,
      dispatch,
    });
  }
};

// Helper function that checks if the active conversation is the same as the one from the data
const updateChatHistoryIfSameConversationActive = ({
  participants,
  usersInConversation,
  messages,
  dispatch,
}) => {
  const isSameConversationActive = participants.every((participant) =>
    usersInConversation.includes(participant)
  );

  console.log("Checking Conversation Match:", {
    participants,
    usersInConversation,
    isSameConversationActive,
  });

  if (isSameConversationActive) {
    console.log("Dispatching setMessages with:", messages);
    dispatch(setMessages(messages));
  } else {
    console.log("Conversations do not match. Skipping dispatch.");
  }
};
