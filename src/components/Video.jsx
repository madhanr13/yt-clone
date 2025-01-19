import React from "react";
import { MdVerified } from "react-icons/md";

function Video({ thumbnail, duration, name, channel, views, uploadTime,logo }) {
  return <div className="flex flex-col max-w-[260px] cursor-pointer ">
    <div className="relative w-full">
        <img src={thumbnail} alt="thumbnail" className="w-full h-full overflow-hidden rounded" />
        <p className="absolute right-2 top-[85%] px-1 text-xs bg-yt-black text-yt-white rounded">{duration}</p>
    </div>
    <div className="flex mt-3">
        <img src={logo} alt="logo" className="h-9 w-9 rounded-full" />
        <div className="ml-2">
            <h2 className="font-medium text-yt-white text-sm mt-0 mb-0 items-center">
                {name.length <= 60? name : `${name.substring(0,55)}...`}
            </h2>
            <h3 className="text-yt-gray text-xs flex mt-1 items-center">
                {channel} <span className="p-1 ">
                    <MdVerified/>
                </span>
            </h3>
            <p className="text-yt-gray m-0 font-medium text-xs">
                {views} views • {uploadTime}
            </p>
        </div>
    </div>
  </div>;
}

export default Video;
