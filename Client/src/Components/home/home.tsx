import React, { useEffect } from "react";
import "../../styles/home.css";
import { fetchPosts, selectIsLoading } from "../../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import Header from "./header";
import SystemOption from "./systemOption";
import { getUser, selectUsername } from "../../store/userSlice";
import PostList from "./postList";
import socket from "./connectSocket";
import { Helmet } from "react-helmet";
const HomePage: React.FC = () => {
  const Dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUsername);
  useEffect(() => {
    async function getUser() {
      socket.emit("userOnline", user._id);
      return () => {
        socket.off("userOnline");
      };
    }
    getUser();
  }, [user]);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        Dispatch(getUser());
        Dispatch(fetchPosts());
      } catch (error: any) {
        console.log(error);
      }
    };
    getAllPosts();
  }, [Dispatch]);

  return (
    <div className="homeContainer">
      <Helmet>
        <title>home</title>
        <meta name="description" content="access the home page from here " />
      </Helmet>
      <Header />
      {isLoading ? (
        <p className="loading">loading...</p>
      ) : (
        <div className="postAndSystemOptionsContainer flex flex-col lg:flex-row gap-2 px-4 lg:px-10 py-6">
          {/* Hide SystemOption on smaller screens */}
          <div className="hidden lg:block lg:w-1/4">
            <SystemOption />
          </div>
          {/* PostList should take the full width on smaller screens */}
          <div className="w-full lg:w-3/4">
            <PostList />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
