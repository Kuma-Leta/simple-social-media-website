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
    <div className=" font-serif fixed top-24 left-0 h-screen w-64 bg-white-400 text-white shadow-lg none sm:block max-sm:hidden">
      <div className=" flex flex-col p-6 space-y-4 text-black">
        {/* Categories Dropdown */}
        <button className=" w-full text-left">
          <p className="font-bold uppercase mb-2">Categories</p>
          <div className=" absolute left-0 top-full mt-2 bg-gray-700 p-3 rounded-lg shadow-lg hidden group-hover:block">
            {["Technology", "Arts", "Politics", "Sports"].map(
              (category, index) => (
                <ul key={index}>
                  <li className="py-1 px-2 hover:bg-gray-600 rounded-lg cursor-pointer">
                    {category}
                  </li>
                </ul>
              )
            )}
          </div>
        </button>

        {/* Profile Button */}
        <button
          title="Click to view your profile"
          onClick={() => navigate("/profile")}
          className="flex items-center space-x-2 py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-400"
        >
          <i className="fas fa-user"></i>
          <span>View Your Profile</span>
        </button>

        {/* Create Post Button */}
        <button
          title="Click to create your post"
          onClick={() => navigate("/profile/addPost")}
          className="flex items-center space-x-2 py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-400"
        >
          <i className="fas fa-edit"></i>
          <span>Create Your Post</span>
        </button>

        {/* Logout Button */}
        <button
          title="Click to logout"
          onClick={handleLogout}
          className="flex items-center space-x-2 py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-400"
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>

        {/* Notifications Button */}
        <button
          title="Click to view your notifications"
          className="flex items-center justify-between py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-400"
        >
          <i className="fas fa-bell"></i>
          <span>Notifications</span>
          <div className="flex items-center space-x-2">
            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-sm">
              25
            </span>
          </div>
        </button>

        {/* Posts Button */}
        <button
          title="Click to view your posts"
          onClick={() => navigate("/profile")}
          className="flex items-center space-x-2 py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-400"
        >
          <i className="fas fa-th-list"></i>
          <span>Your Posts</span>
        </button>

        {/* Settings Button */}
        <button
          title="Click to view settings"
          className="flex items-center space-x-2 py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-400"
        >
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};
export default SystemOption;
