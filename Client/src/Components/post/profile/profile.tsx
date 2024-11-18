import React from "react";
import AddPost from "./addPost";
import PreviousPosts from "./PreviousPosts";
import { useNavigate } from "react-router-dom";
const Profile: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-6  justify-between items-center">
      <button
        onClick={() => navigate("/profile/addPost")}
        className="bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add Post
      </button>
      <PreviousPosts />
    </div>
  );
};
export default Profile;
