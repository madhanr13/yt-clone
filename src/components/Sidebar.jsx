import { SideBarItems } from "../static/data";
import "../App.css";
import { useState } from "react";

const Sidebar = () => {
  const year = new Date().getFullYear()
  const [active, setActive] = useState("Home");
  return (
    <div className="yt-scrollbar scrollbar-hide w-60 bg-yt-black h-[calc(100vh-53px)] mt-14 fixed top-0 left-0 text-yt-white p-3 overflow-scroll ">
      <div className="mb-4">
        {SideBarItems.Top.map((item, index) => {
          return (
            <div
              key={index}
              className={`h-10 flex justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-light-black my-1 ${
                item.name === active ? "bg-yt-light-black" : "bg-yt-black"
              }`}
              onClick={() => setActive(item.name)}
            >
              <span className="mr-5">{item.icon}</span>
              <p className="p-2 text-sm font-medium">{item.name}</p>
            </div>
          );
        })}
      </div>
      <hr className="my-2 text-yt-light-black" />
      <div className="mb-4">
        {SideBarItems.Middle.map((item, index) => {
          return (
            <div
              key={index}
              className={`h-10 flex justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-light-black my-1 ${
                item.name === active ? "bg-yt-light-black" : "bg-yt-black"
              }`}
              onClick={() => setActive(item.name)}
            >
              <span className="mr-5">{item.icon}</span>
              <p className="p-2 text-sm font-medium">{item.name}</p>
            </div>
          );
        })}
      </div>
      <hr className="my-2 text-yt-light-black" />
      <h2 className="pb-3 pt-1 font-bold ml-2">Explore</h2>
      <div className="mb-4">
        {SideBarItems.Explore.map((item, index) => {
          return (
            <div
              key={index}
              className={`h-10 flex justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-light-black my-1 ${
                item.name === active ? "bg-yt-light-black" : "bg-yt-black"
              }`}
              onClick={() => setActive(item.name)}
            >
              <span className="mr-5">{item.icon}</span>
              <p className="p-2 text-sm font-medium">{item.name}</p>
            </div>
          );
        })}
      </div>
      <hr className="my-2 text-yt-light-black" />

      <div className="text-center text-yt-light-black">
        &copy; {year} Madhan LLC
      </div>
    </div>
  );
};

export default Sidebar;
