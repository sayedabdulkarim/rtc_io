// // import store from "../../store/store";

// import { setMessages } from "../../slices/chat/chatSlice";

// export const updateDirectChatHistoryIfActive = (data) => {
//   // const { participants, messages } = data;
//   // // find id of user from token and id from active conversation
//   // const receiverId = store.getState().chat.chosenChatDetails?.id;
//   // const userId = store.getState().auth.userDetails._id;
//   // if (receiverId && userId) {
//   //   const usersInCoversation = [receiverId, userId];
//   //   updateChatHistoryIfSameConversationActive({
//   //     participants,
//   //     usersInCoversation,
//   //     messages,
//   //   });
//   // }
// };

// const updateChatHistoryIfSameConversationActive = ({
//   participants,
//   usersInCoversation,
//   messages,
// }) => {
//   // const result = participants.every(function (participantId) {
//   //   return usersInCoversation.includes(participantId);
//   // });
//   // if (result) {
//   //   // store.dispatch(setMessages(messages));
//   // }
// };

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

  console.log(
    { chosenChatDetails, userDetails },
    " from updateDirectChatHistoryIfActive"
  );
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
  // Verify that the participants in the conversation match the active users
  const isSameConversationActive = participants.every((participant) =>
    usersInConversation.includes(participant)
  );

  if (isSameConversationActive) {
    // Dispatch the action to update the messages in the chat slice
    dispatch(setMessages(messages));
  }
};
