import "../../styles/home.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUsername } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { searchPosts } from "../../store/postSlice";
import { AppDispatch } from "../../store";
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
    <header>
      <h1>
        <Link to={"/home"}>Blog Post.</Link>
      </h1>
      <div className="profileAndSearchContainer font-mono">
        <Link to={"/profile"}>
          <i className="fas fa-user "></i> profile :{user || "guest"}
        </Link>
        <div>
          <input
            type="text"
            placeholder="search for post"
            onChange={(e) => setuserQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            value={userQuery}
          />
          {/* <button className="notifications">
              <i className="fas fa-bell"></i>
              {notificationCount > 0 && <span>{notificationCount}</span>}
            </button> */}
        </div>
      </div>
    </header>
  );
};
export default Header;
