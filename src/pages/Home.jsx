import Sidebar from "../components/Sidebar";
import { CategoryItems } from "../static/data.jsx";
const Home = () => {
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
      </div>
    </>
  );
};

export default Home;
