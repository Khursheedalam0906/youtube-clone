import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import { useSelector } from "react-redux";

const Feed = () => {
  const open = useSelector((store) => store.app.open);

  return (
    <div className={`mt-3 ml-5   ${open ? "w-[82%] " : "w-[92%]"}`}>
      <ButtonList />
      <div className=" overflow-y-scroll h-[calc(100vh-9rem)] overflow-x-hidden">
        <VideoContainer />
      </div>
    </div>
  );
};

export default Feed;
