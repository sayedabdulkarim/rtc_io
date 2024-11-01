import React, { useEffect } from "react";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { logoutUser } from "../../../slices/auth/authSlice";
import { useDispatch } from "react-redux";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const Dashboard = () => {
  //misc
  const dispatch = useDispatch();

  useEffect(() => {
    const userDetails = localStorage.getItem("user");

    if (!userDetails) {
      dispatch(logoutUser());
    }
  }, [dispatch]);

  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
    </Wrapper>
  );
};

export default Dashboard;
