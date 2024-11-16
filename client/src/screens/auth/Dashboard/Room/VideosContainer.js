import React from "react";
import { styled } from "@mui/system";
import Video from "./Video";
import { useSelector } from "react-redux";

const MainContainer = styled("div")({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

const VideosContainer = () => {
  const { localStream, remoteStreams, screenSharingStream } = useSelector(
    (state) => state.roomReducer
  );
  return (
    <MainContainer>
      <Video
        stream={screenSharingStream ? screenSharingStream : localStream}
        isLocalStream
      />
      {remoteStreams.map((stream) => (
        <Video stream={stream} key={stream.id} />
      ))}
    </MainContainer>
  );
};

export default VideosContainer;
