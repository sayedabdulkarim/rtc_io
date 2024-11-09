import React from "react";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";
import { useSelector } from "react-redux";

const DUMMY_FRIENDS = [
  {
    id: 1,
    username: "Mark",
    isOnline: true,
  },
  {
    id: 2,
    username: "Anna",
    isOnline: false,
  },
  {
    id: 3,
    username: "John",
    isOnline: false,
  },
];

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const FriendsList = () => {
  const { pendingFriendsInvitations, friends, onlineUsers } = useSelector(
    (state) => state.friendReducer
  );
  return (
    <MainContainer>
      {friends.map((f) => (
        <FriendsListItem
          username={f.username}
          id={f.id}
          key={f.id}
          isOnline={onlineUsers.some((user) => user.userId === f.id)}
        />
      ))}
    </MainContainer>
  );
};

export default FriendsList;
