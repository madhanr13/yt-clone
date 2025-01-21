import { addDoc, collection, doc, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db, timestamp } from "../firebase";
import { AiFillLike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { HiDotsHorizontal, HiDownload } from "react-icons/hi";
import { MdOutlineSort } from "react-icons/md";
import { BiDislike } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "../slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    document.title = `${data?.name}   |   Youtube`;
    if (id) {
      const q = query(doc(db, "videos", id));
      onSnapshot(q, (snapshot) => {
        setData(snapshot.data());
      });
      const commentsQuery = query(collection(db, "videos", id, "comments"));
      onSnapshot(commentsQuery, (snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({
            ...data.doc(),
            id: doc.id,
          }))
        );
      });
    }
  }, [id]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
  }, []);

  const addComment = async (e) => {
    e.preventDefault();
    let commentData = {
      image: data?.photoURL,
      name: data?.displayName,
      comment,
      uploaded: timestamp,
    };
    if (id) {
      await addDoc(collection(db, "videos", id, "comments"), commentData);
      setComment("")
    }
  };

  return (
    <div className="py-20 px-9 bg-yt-black flex flex-row h-full">
      <div className="left flex-1">
        <div className="flex justify-center">
          <iframe
            src={`https://www.youtube.com/embed/${data?.link}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-[850px] h-[700px] flex-1"
          ></iframe>
        </div>
        <h2 className="text-yt-white font-semibold mt-3 text-lg mb-1">
          {data?.name}
        </h2>
        <div className="flex">
          <div className="flex items-center">
            <img
              src={data?.logo}
              alt={data?.channel}
              className="rounded-full h-10 w-10"
            />
            <div className="px-3">
              <h3 className="font-medium text-yt-white text-base">
                {data?.channel && data?.channel.length <= 30
                  ? data?.channel
                  : `${data?.channel && data?.channel.substring(0, 20)}...`}
              </h3>
              <p className="text-sm font-medium text-yt-gray">
                {data?.subscribers} Subscribers
              </p>
            </div>
            <button className="bg-yt-white px-3 py-2 rounded-lg text-sm font-medium ml-3">
              Subscribe
            </button>
            <div className="flex pl-28">
              <div className="flex bg-yt-light-black items-center rounded-2xl h-10 mx-1 hover:bg-yt-light-1">
                <div className="flex px-3 items-center border-r-2 border-r-yt-light-1 cursor-pointer">
                  <AiFillLike className="text-yt-white text-2xl" />
                  <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                    300K
                  </p>
                </div>
                <div className="pl-4 pr-5 cursor-pointer">
                  <BiDislike className="text-yt-white text-2xl" />
                </div>
              </div>
              <div className="flex bg-yt-light-black items-center rounded-2xl h-10 mx-1 cursor-pointer hover:bg-yt-light-1 ">
                <div className="flex px-3 items-center cursor-pointer">
                  <RiShareForwardLine className="text-yt-white text-2xl font-thin" />
                  <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                    Share
                  </p>
                </div>
              </div>
              <div className="flex bg-yt-light-black items-center rounded-2xl h-10 mx-1 cursor-pointer hover:bg-yt-light-1 ">
                <div className="flex px-3 items-center cursor-pointer">
                  <HiDownload className="text-yt-white text-2xl font-thin" />
                  <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                    Download
                  </p>
                </div>
              </div>
              <div className="flex bg-yt-light-black hover:bg-yt-light-1 cursor-pointer items-center rounded-full justify-center w-10 h-10 text-yt-white ">
                <HiDotsHorizontal />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl bg-yt-light-black mt-4 p-3 rounded-2xl text-sm text-yt-white ">
          <div className="flex">
            <p className="font-medium pr-3">
              {data?.views}
              <span className="pl-1 text-sm">views</span>
            </p>
            <p className="font-medium pr-3">{data?.uploadTime}</p>
          </div>
          <span className="text-center font-medium">
            {data?.description && data?.description.length <= 1000
              ? data?.description
              : `${data?.description && data?.description.substring(0, 600)}`}
          </span>
        </div>
        <div className="text-yt-white mt-5 ">
          <div className="flex items-center">
            <h1>{comments.length} Comments</h1>
            <div className="flex items-center mx-10">
              <MdOutlineSort size={30} className="text-yt-white mx-3" />
              <p className="text-sm font-medium text-yt-white">Sort by</p>
            </div>
          </div>

          {user && (
            <form
              onSubmit={addComment}
              className="flex w-[800px] pt-4 items-start"
            >
              <img
                src={user?.photoURL}
                alt="profile"
                className="rounded-full mr-3 h-10 w-10"
              />
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="Add a comment..."
                className="bg-[transparent] border-b border-b-yt-light-black outline-none text-sm p-1 w-full"
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Video;
