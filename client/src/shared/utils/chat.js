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
  // Sort both arrays before comparing
  const sortedParticipants = participants.slice().sort(); // Make sure to copy and then sort
  const sortedUsersInConversation = usersInConversation.slice().sort();

  console.log("sortedParticipants:", sortedParticipants);
  console.log("sortedUsersInConversation:", sortedUsersInConversation);

  const isSameConversationActive = sortedParticipants.every(
    (participant, index) => participant === sortedUsersInConversation[index]
  );

  console.log("Checking Conversation Match:", {
    sortedParticipants,
    sortedUsersInConversation,
    isSameConversationActive,
  });

  // if (isSameConversationActive) {
  if (true) {
    console.log("Dispatching setMessages with:", messages);
    dispatch(setMessages(messages));
  } else {
    console.log("Conversations do not match. Skipping dispatch.");
  }
};
