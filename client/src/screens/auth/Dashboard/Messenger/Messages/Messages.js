import React, { userRef, useEffect } from "react";
import { styled } from "@mui/system";
import MessagesHeader from "./MessagesHeader";
import { useSelector } from "react-redux";
import DUMMY_MESSAGES from "./DUMMY_MESSAGES";
import Message from "./Message";
import DateSeparator from "./DateSeparator";

const MainContainer = styled("div")({
  height: "calc(100% - 60px)",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const convertDateToHumanReadable = (date, format) => {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
};

const Messages = () => {
  //misc
  const { chosenChatDetails, messages } = useSelector(
    (state) => state.chatReducer
  );

  return (
    <MainContainer>
      <h1 onClick={() => console.log(messages, " mmm")}>Hello</h1>
      <MessagesHeader name={chosenChatDetails?.name} />
      {/* TODO: to make dynamic */}
      {messages?.map((message, index) => {
        // {DUMMY_MESSAGES.map((message, index) => {
        const sameAuthor =
          index > 0 &&
          DUMMY_MESSAGES[index]?.author?._id ===
            DUMMY_MESSAGES[index - 1]?.author?._id;

        const sameDay =
          index > 0 &&
          convertDateToHumanReadable(
            new Date(DUMMY_MESSAGES[index]?.date),
            "dd/mm/yy"
          ) ===
            convertDateToHumanReadable(
              new Date(DUMMY_MESSAGES[index - 1]?.date),
              "dd/mm/yy"
            );

        return (
          <div key={message._id} style={{ width: "97%" }}>
            {(!sameDay || index === 0) && (
              <DateSeparator
                date={convertDateToHumanReadable(
                  new Date(message.date),
                  "dd/mm/yy"
                )}
              />
            )}
            <Message
              content={message.content}
              username={message.author.username}
              sameAuthor={sameAuthor}
              date={convertDateToHumanReadable(
                new Date(message.date),
                "dd/mm/yy"
              )}
              sameDay={sameDay}
            />
          </div>
        );
      })}
    </MainContainer>
  );
};

export default Messages;
