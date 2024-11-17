import React from "react";
// import "./styles/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddPost from "./Components/post/profile/addPost";
// import DeletePost from "./Components/Profile/deletePost";
import EditPost from "./Components/post/profile/editPost";
import PreviousPosts from "./Components/post/profile/PreviousPosts";
import AllPosts from "./Components/post/allPosts";
import Login from "./Components/users/login";
import Signup from "./Components/users/signup";
import NotFound from "./Components/notFound";
import HomePage from "./Components/home/home";
import SystemOverview from "./Components/systemOverview";
import { PrivateRoutes } from "./privateRoutes";
import Profile from "./Components/post/profile/profile";
import Settings from "./Components/settings/settings";
import ChangeYourName from "./Components/settings/changeName";
import ChangeYourPassword from "./Components/settings/changePassword";
import ChangeEmail from "./Components/settings/changeEmail";
const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SystemOverview />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoutes>
                <Profile />
              </PrivateRoutes>
            }
          />
          <Route
            path="/profile/userSetting"
            element={
              <PrivateRoutes>
                <Settings />
              </PrivateRoutes>
            }
          />
          <Route
            path="/profile/userSetting/changePassword"
            element={
              <PrivateRoutes>
                <ChangeYourPassword />
              </PrivateRoutes>
            }
          />
          <Route
            path="/profile/userSetting/changeName"
            element={
              <PrivateRoutes>
                <ChangeYourName />
              </PrivateRoutes>
            }
          />
          <Route
            path="/profile/userSetting/changeEmail"
            element={
              <PrivateRoutes>
                <ChangeEmail />
              </PrivateRoutes>
            }
          />

          <Route
            path="/profile/addPost"
            element={
              <PrivateRoutes>
                <AddPost />
              </PrivateRoutes>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoutes>
                <HomePage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/profile/editPost/:id"
            element={
              <PrivateRoutes>
                <EditPost />
              </PrivateRoutes>
            }
          />
          <Route
            path="/allPosts"
            element={
              <PrivateRoutes>
                <AllPosts />
              </PrivateRoutes>
            }
          />
          <Route
            path="/profile/previousPosts"
            element={
              <PrivateRoutes>
                <PreviousPosts />
              </PrivateRoutes>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
