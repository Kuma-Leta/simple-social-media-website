import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import axios from "../../axiosConfig";
import Rating from "./handleRating";
import CommentPopup from "./comment";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000/api");
interface Comment {
  _id: string;
  user: string;
  date: Date;
  comment: string;
}

export interface post {
  _id: string;
  author: string;
  textContent: string;
  imageContent: string;
  videoContent: string;
  rating: number;
  user: string;
  likes: number;
  comments: Array<Comment>;
}
const useReducer = (state, action) => {};
const HomePage: React.FC = () => {
  const [userQuery, setuserQuery] = useState("");
  const [posts, setPosts] = useState<post[]>([]);
  const [rating, setRating] = useState<number>(4);
  const [user, setUser] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSystemOption, setSystemOption] = useState(true);
  const [isPostAvailable, setIsPostAvailable] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("newLike", (data) => {
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
        const token = await localStorage.getItem("authToken");
        const user = await axios.get(
          `http://localhost:5000/api/getUser/${token}`
        );
        setUser(user.data.User.name);
        const allPosts = await axios.get(
          "http://localhost:5000/api/getAllposts"
        );
        setPosts(allPosts.data.posts);
        setIsPostAvailable(true);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getAllPosts();
  }, []);

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
  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const postResult = await axios.post(
        "http://localhost:5000/api/searchByUserQuery",
        { userQuery }
      );
      setPosts(postResult.data.posts);
    }
  };

  const updateRating = async (newValue: number) => {
    setRating(newValue);
  };

  const handleCommentClick = (postId: string) => {
    setSelectedPostId(postId);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedPostId(null);
    setIsPopupOpen(false);
  };

  const handleLikes = async (postId: string) => {
    const result = await axios.post("http://localhost:5000/api/likePost", {
      postId,
    });
    const updatedPosts = posts.map((post) =>
      post._id === postId
        ? { ...post, likes: result.data.updatedPost.likes }
        : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="homeContainer ">
      <header>
        <h1>
          <Link to={"/home"}>Blog Post.</Link>
        </h1>
        <div className="profileAndSearchContainer">
          <Link to={"/profile"}>
            <i class="fas fa-user"></i> profile :{user}
          </Link>
          <div>
            <input
              type="text"
              placeholder="search for post"
              onChange={(e) => setuserQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="notifications">
              <i className="fas fa-bell"></i>
              <span>10</span>
            </button>
          </div>
        </div>
      </header>
      {isPostAvailable ? (
        <div className="postAndSystemOptionsContainer">
          <div className="menuAndSystemOption">
            <div className="menu">
              <button
                onClick={() => setSystemOption(!isSystemOption)}
                title="menu"
                className=""
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
            {isSystemOption && (
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
                  settings <i class="fas fa-cog"></i>
                </button>
              </div>
            )}
          </div>
          <div className="postsContainer">
            {posts.map((post: post) => (
              <div className="post" key={post._id}>
                <div className="eachPost">
                  <div className="postDropdown">
                    <button>...</button>
                  </div>
                  <p className="author">Author :{post.author}</p>
                  <p className="textContent"> {post.textContent}</p>
                  {post.imageContent && (
                    <div>
                      <img
                        src={`http://localhost:5000/${post.imageContent}`}
                        alt="Post"
                      />
                    </div>
                  )}
                  {post.videoContent && (
                    <div>
                      <video
                        src={`http://localhost:5000/${post.videoContent}`}
                        controls
                      />
                    </div>
                  )}
                  <div className="LCcontainer">
                    <div className="likeAndComment">
                      <div className="likeRatingComment">
                        <p>
                          <i class="fas fa-star"></i>:{post.rating.toFixed(1)}
                        </p>
                        <button onClick={() => handleLikes(post._id)}>
                          <i class="fas fa-thumbs-up"></i>
                          {post.likes}
                        </button>
                        <button onClick={() => handleCommentClick(post._id)}>
                          <i class="fas fa-comment"></i>
                          comment
                        </button>
                        <Rating
                          postId={post._id}
                          initialRating={post.rating}
                          user={post.user}
                          updateRating={updateRating}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="commentsContainer">
                  <h3>Comments</h3>
                  {post.comments.length === 0 && (
                    <p className="noComments">
                      No Comments yet be the first to comment
                    </p>
                  )}
                  <ul>
                    {post.comments.map((comment) => (
                      <li key={comment._id} className="comment">
                        <p>{comment.comment}</p>
                        <p>
                          <small>by {comment.user}</small>
                        </p>
                        <p>
                          <small>
                            {new Date(comment.date).toLocaleString()}
                          </small>
                        </p>
                      </li>
                    ))}
                  </ul>
                  <form className="addComment" action="">
                    <input
                      className="addComment"
                      type="text"
                      placeholder="leave a comment"
                    />
                    <input type="submit" value={"add"} />
                  </form>
                </div>
              </div>
            ))}
            {posts.length === 0 && (
              <div className="eachPost">No posts Found</div>
            )}
          </div>
        </div>
      ) : (
        <p className="loading">loading...</p>
      )}

      {selectedPostId && (
        <CommentPopup postId={selectedPostId} onClose={closePopup} />
      )}
    </div>
  );
};

export default HomePage;
