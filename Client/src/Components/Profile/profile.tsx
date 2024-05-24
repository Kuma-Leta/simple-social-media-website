import React from "react";
import { Link } from "react-router-dom";
import PreviousPosts from "./PreviousPosts";
const Profile: React.FC = () => {
  return (
    <>
      <Link to={"/profile/userSetting"}> settings</Link>
      <Link to={"/profile/addPost"}>addPost</Link>
      <PreviousPosts />
    </>
  );
};
export default Profile;
