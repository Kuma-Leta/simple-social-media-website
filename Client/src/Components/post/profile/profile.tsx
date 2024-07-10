import React from "react";
import AddPost from "./addPost";
import PreviousPosts from "./PreviousPosts";
import { useNavigate } from "react-router-dom";
const Profile: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/profile/addPost")}>add Post</button>
      <PreviousPosts />
    </div>
  );
};
export default Profile;
