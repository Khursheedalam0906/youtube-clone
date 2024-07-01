import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API_KEY from "../constant/youtube";
import axios from "axios";
import Avatar from "react-avatar";
import { AiOutlineLike } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuSendHorizonal } from "react-icons/lu";
import LiveChat from "./LiveChat";
import { useDispatch } from "react-redux";
import { setMessage } from "../utils/chatSlice";
import { IoMdDownload } from "react-icons/io";
import { BiDislike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { IconButton } from "@mui/material";

const Watch = () => {
  const [input, setInput] = useState("");
  const [singleVideo, setSingleVideo] = useState(null);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();

  const getSingleVideo = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
      );
      setSingleVideo(res?.data?.items[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = () => {
    dispatch(setMessage({ name: "Patel", message: input }));
    setInput("");
  };

  useEffect(() => {
    getSingleVideo();
  }, []);

  return (
    <div className="flex ml-4 w-[100%] mt-2">
      <div className="grid grid-cols-4 gap-2 ">
        <div className="col-span-3">
          <iframe
            width="800"
            height="400"
            src={`https://www.youtube.com/embed/${videoId}?&autoplay=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <h1 className="font-bold mt-2 text-lg">
            {singleVideo?.snippet?.title}
          </h1>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center justify-between w-[42%]">
              <div className="flex items-center">
                <Avatar
                  src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw"
                  size={35}
                  round={true}
                />
                <h1 className="font-bold ml-2">
                  {singleVideo?.snippet?.channelTitle}
                </h1>
              </div>
              <button className="px-4 py-1 font-medium bg-black text-white rounded-full ml-5">
                Subscribe
              </button>
            </div>
            <div className="flex justify-between items-center w-[40%]">
              <div className="flex items-center">
                <button className="py-2 px-3 bg-[#f2f2f2] hover:bg-[rgb(218,216,216)] rounded-l-full">
                  <AiOutlineLike size={22} />
                </button>
                <button className="py-2 px-3 bg-[#f2f2f2] hover:bg-[rgb(218,216,216)]  rounded-r-full">
                  <BiDislike size={22} />
                </button>
              </div>
              <div>
                <button className="flex items-center py-2 px-3 bg-[#f2f2f2] hover:bg-[rgb(218,216,216)]  rounded-full">
                  <RiShareForwardLine size={22} />
                  <p className="ml-2">Share</p>
                </button>
              </div>
              <div>
                <button className="flex items-center py-2 px-3 bg-[#f2f2f2] hover:bg-[rgb(218,216,216)]  rounded-full">
                  <IoMdDownload size={22} />
                  <p className="ml-2">Download</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] border border-gray-300 ml-5 rounded-lg h-fit  mt-3">
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h1>Top Chat</h1>
              <IconButton>
                <BsThreeDotsVertical />
              </IconButton>
            </div>
            <div className="overflow-y-auto overflow-x-hidden h-[25rem] flex flex-col-reverse">
              <LiveChat />
            </div>
          </div>

          <div className="flex items-center justify-between border-t p-2">
            <div className="flex items-center w-[90%]">
              <div>
                <Avatar
                  src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw"
                  size={35}
                  round={true}
                />
              </div>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border-b border-gray-300 outline-none ml-2 w-40"
                type="text"
                placeholder="Send message..."
              />
              <div className="bg-gray-200 cursor-pointer p-2 rounded-full hover:bg-gray-400">
                <LuSendHorizonal onClick={sendMessage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
