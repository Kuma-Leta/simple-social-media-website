import React, { useEffect } from "react";
import "../../styles/home.css";
// import axios from "../../axiosConfig";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
import {
  fetchPosts,
  selectIsLoading,
  selectPosts,
  // selectPosts,
} from "../../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import Header from "./header";
import SystemOption from "./systemOption";
import { getUser } from "../../store/userSlice";
import PostList from "./postList";
import { selectError } from "../../store/commentSlice";
const HomePage: React.FC = () => {
  const Dispatch = useDispatch<AppDispatch>();
  // const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);
  const posts = useSelector(selectPosts);
  const isError = useSelector(selectError);
  useEffect(() => {
    socket.on("newLike", (data) => {
      // dispatch({ type: "NOTIFICATION_COUNT", payload: notificationCount + 1 });
      alert(data.message);
    });

    socket.on("newComment", (data) => {
      alert(data.message);
    });

    return () => {
      socket.off("newLike");
      socket.off("newComment");
    };
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

  // const handleCommentClick = (postId: string) => {
  //   dispatch({ type: "SET_SELECTED_POST_ID", payload: postId });
  //   dispatch({ type: "SET_IS_POPUP_OPEN", payload: true });
  // };

  // const closePopup = () => {
  //   dispatch({ type: "SET_SELECTED_POST_ID", payload: null });
  //   dispatch({ type: "SET_IS_POPUP_OPEN", payload: false });
  // };

  // const handleLikes = async (postId: string) => {
  //   const result = await axios.post("http://localhost:5000/api/likePost", {
  //     postId,
  //   });
  //   const updatedPosts = posts.map((post) =>
  //     post._id === postId
  //       ? { ...post, likes: result.data.updatedPost.likes }
  //       : post
  //   );
  // setPosts(updatedPosts);
  // dispatch({ type: "SET_POSTS", payload: updatedPosts });
  // };

  return (
    <div className="homeContainer ">
      <Header />
      {isLoading ? (
        <p className="loading">loading...</p>
      ) : (
        <div className="postAndSystemOptionsContainer ">
          <SystemOption />
          <PostList />
        </div>
      )}

      {/* {selectedPostId && (
        <CommentPopup postId={selectedPostId} onClose={closePopup} />
      )} */}
    </div>
  );
};

export default HomePage;
