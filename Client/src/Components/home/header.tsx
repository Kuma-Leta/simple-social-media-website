import "../../styles/home.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUsername } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { searchPosts } from "../../store/postSlice";
import { AppDispatch } from "../../store";
// import { ChatBubbleLeftIcon } from "@heroicons/react/24/solid";

const Header: React.FC = () => {
  const user = useSelector(selectUsername);
  const [userQuery, setuserQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      // const postResult = await axios.post(
      //   "http://localhost:5000/api/searchByUserQuery",
      //   { userQuery }
      // );
      // dispatch({ type: "SET_POSTS", payload: postResult.data.posts });
      dispatch(searchPosts(userQuery));
      setuserQuery("");
    }
  };
  return (
    <header className="sm:w-full bg-gray-100 text-black shadow-md sticky top-0 z-50 p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <Link
          to="/home"
          className=" text-black hover:text-blue-200 transition duration-300"
        >
          Blog Post
        </Link>
      </h1>
      <div className=" flex items-center space-x-6 font-mono">
        <div className="relative flex space-x-6 items-center">
          <input
            type="text"
            placeholder="Search for post"
            className="px-4 py-2 rounded-lg text-gray-700 focus:outline-none border border-blue-500  focus:ring-black-300 "
            onChange={(e) => setuserQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            value={userQuery}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-blue-500 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.261 9-7.5s-4.03-7.5-9-7.5-9 3.261-9 7.5c0 1.741.772 3.329 2.065 4.56C4.7 18.306 3.75 19.5 3.75 19.5s2.173-.288 3.967-1.341c.985.29 2.03.466 3.158.55a.75.75 0 00.125 0z"
            />
          </svg>

          <span className="cursor-pointer relative">
            <i className="fas fa-bell"></i>
            <span className="bg-red-600 absolute text-xs  font-bold -top-3 -right-2 text-white items-center justify-center rounded-full w-5 h-5">
              10
            </span>
          </span>
          <Link
            to="/profile"
            className="flex items-center hover:text-blue-200 transition duration-300 "
          >
            <i className="fas fa-user mr-2"></i>
            <span className="hidden sm:inline-block">Profile:</span>{" "}
            {user?.firstName + " " + user?.lastName || "Guest"}
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
