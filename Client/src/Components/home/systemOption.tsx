import React from "react";
import { useNavigate } from "react-router-dom";
const SystemOption: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const userConfirmed = window.confirm("are you sure you want to logout ?");
    if (userConfirmed) {
      try {
        localStorage.removeItem("authToken");
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="menuAndSystemOption">
      {/* <div className="menu"> */}
      {/* <button
                onClick={() =>
                  dispatch({
                    type: "SET_SYSTEM_OPTION",
                    payload: !isSystemOption,
                  })
                }
                title="menu"
                className=""
              >
                <i className="fas fa-bars"></i>
              </button> */}
      {/* </div> */}
      {/* {isSystemOption && ( */}
      <div className="sytemOptions">
        <button className="categoriesContainer">
          <p>categories</p>
          <div className="categories">
            {["technology", "Arts", "politics", "sports"].map(
              (category, index) => (
                <ul>
                  <li key={index}>{category}</li>
                </ul>
              )
            )}
          </div>
        </button>
        <button
          title="click to view your profile"
          onClick={() => navigate("/profile")}
        >
          View your Profile
        </button>
        <button
          title="click to create your post"
          onClick={() => navigate("/profile/addPost")}
        >
          Create your Post
        </button>
        <button title="click to logout" onClick={handleLogout}>
          logout
        </button>
        <button
          title="click to view your notifications"
          className="notifications"
        >
          Notifications<i className="fas fa-bell"></i>{" "}
          <span className="notSize"> 25 </span>
        </button>
        <button
          title="click to view your posts"
          onClick={() => navigate("/profile")}
        >
          your posts
        </button>
        <button title="click to view  videos">
          settings <i className="fas fa-cog"></i>
        </button>
      </div>
      {/* )} */}
    </div>
  );
};
export default SystemOption;
