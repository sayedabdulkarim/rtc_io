import React, { useEffect } from "react";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { logoutUser } from "../../../slices/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { connectWithSocketServer } from "../../../realtimeCommunication/socketConnection";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const Dashboard = () => {
  //misc
  const { userDetails } = useSelector((state) => state.authReducer);
  const { pendingFriendsInvitations, friends, onlineUsers } = useSelector(
    (state) => state.friendReducer
  );
  const { chosenChatDetails, chatType, messages } = useSelector(
    (state) => state.chatReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userDetails) {
      dispatch(logoutUser());
    } else connectWithSocketServer(userDetails, dispatch);
  }, [dispatch, userDetails]);

  return (
    <Wrapper>
      <button
        onClick={() =>
          console.log(
            {
              pendingFriendsInvitations,
              friends,
              chosenChatDetails,
              chatType,
              messages,
            },
            " hh"
          )
        }
      >
        hello
      </button>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
    </Wrapper>
  );
};

export default Dashboard;
