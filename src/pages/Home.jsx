import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { CategoryItems } from "../static/data.jsx";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase.js";
import { Link } from "react-router-dom";
import Video from "../components/Video.jsx";
const Home = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "videos"));
    onSnapshot(q, (snapshot) => {
      setVideos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  return (
    <>
      <Sidebar />
      <div className="w-[calc(100%-240px)] h-[calc(100%-53px)] pt-16 bg-yt-black ml-60 ">
        <div className="flex flex-row px-3 overflow-x-scroll relative scrollbar-hide">
          {CategoryItems.map((item, index) => (
            <h2
              className="text-yt-white bg-yt-light font-normal text-sm py-2 px-4 break-keep whitespace-nowrap mr-3 cursor-pointer rounded-lg hover:bg-yt-light-black "
              key={index}
            >
              {item}
            </h2>
          ))}
        </div>
        <div className="pt-12 px-5 grid grid-cols-yt gap-x-3 gap-y-8 ">
          {videos.length === 0 ? (
            <div className="h-[86vh]"></div>
          ) : (
            videos.map((video, index) => (
              <Link to={`/video/${video.id}`} key={video.id}>
                <Video {...video}/>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
