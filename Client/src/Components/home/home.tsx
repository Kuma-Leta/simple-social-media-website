import React, { useEffect } from "react";
import "../../styles/home.css";
import { fetchPosts, selectIsLoading } from "../../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import Header from "./header";
import SystemOption from "./systemOption";
import { getUser } from "../../store/userSlice";
import PostList from "./postList";
import socket from "./connectSocket";
const HomePage: React.FC = () => {
  const Dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    async function getUser() {
      // socket.emit("userOnline", user?.User._id);

      return () => {
        socket.off("newLike");
        socket.off("newComment");
      };
    }
    getUser();
  }, []);
  useEffect(() => {
    const getAllPosts = async () => {
      try {
        document.title = "Your Posts";

        Dispatch(getUser());
        Dispatch(fetchPosts());
        // dispatch({ type: "SET_IS_POST_AVAILABLE", payload: true });
      } catch (error: any) {
        console.log(error);
      }
    };
    getAllPosts();
  }, [Dispatch]);

  return (
    <div className="homeContainer ">
      <Header />
      {isLoading ? (
        <p className="loading">loading...</p>
      ) : (
        <div className="postAndSystemOptionsContainer flex flex-col lg:flex-row lg:gap-6 px-4 lg:px-10 py-6 ">
          <SystemOption />
          <PostList />
        </div>
      )}
    </div>
  );
};

export default HomePage;
