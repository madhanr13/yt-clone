import { Link } from "react-router-dom";
import { MdMic } from "react-icons/md";
import { HiOutlineBars3, HiMagnifyingGlass } from "react-icons/hi2";
import { BiVideoPlus } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import logo from "../assets/yt-logo-white.png";
import { ProviderId, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider, db, timestamp, app } from "../firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { setUser, getUser, logout } from "../slices/userSlice.js";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const handleLogin = async () => {
    const response = await signInWithPopup(auth, provider);
    dispatch(setUser(response.user));
  };
  const handleLogout = async () => {
    dispatch(logout())
    await signOut(auth)
  };

  return (
    <div className="bg-yt-black h-14 flex items-center pl-4 pr-5 justify-between fixed w-full z-10 ">
      <div className="flex justify-between items-center">
        <div className="text-yt-white p-2 w-10 text-2xl text-center hover:bg-yt-light-black rounded-full cursor-pointer ">
          <HiOutlineBars3 />
        </div>
        <div className="py-5 w-32 pr-3">
          <Link to="/">
            <img src={logo} alt="logo" className="object-contain" />
          </Link>
        </div>
      </div>
      <div className="h-10 flex flex-row items-center">
        <div className="w-[590px] bg-yt-black flex border border-yt-light-black items-center rounded-3xl h-10">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-yt-black h-6 ml-6 text-yt-white text-start focus:outline-none pl-4"
          />
          <button className="bg-yt-light-black w-16 h-10 px-2 py-0.5 rounded-r-3xl border-l-2 border-yt-light-black">
            <HiMagnifyingGlass
              size={22}
              className="text-yt-white inline-block text-center font-thin"
            />
          </button>
        </div>
        <div className="text-yt-white bg-yt-light w-10 h-10 flex items-center justify-center rounded-full ml-4 hover:bg-yt-light-black cursor-pointer ">
          <MdMic className="text-center" size={23} />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-row items-center">
          <div className="mr-2 p-2 w-10 hover:bg-yt-light-black rounded-full cursor-pointer">
            <BiVideoPlus size={24} className="text-yt-white text-center" />
          </div>
          <div className="mx-3 p-2 w-10 hover:bg-yt-light-black rounded-full cursor-pointer ">
            <FaRegBell size={20} className="text-yt-white text-center" />
          </div>
          <div className="mx-3 cursor-pointer items-center">
            {!user ? (
              <button
                onClick={handleLogin}
                className="bg-yt-red py-1 px-4 text-yt-white rounded-md"
              >
                Signin
              </button>
            ) : (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="object-contain rounded-full cursor-pointer w-10 h-10"
                onClick={handleLogout}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
