import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import axios from "../../axiosConfig";
import Rating from "./handleRating";
import CommentPopup from "./comment";
import { useNavigate } from "react-router-dom";
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

const HomePage: React.FC = () => {
  const [userQuery, setuserQuery] = useState("");
  const [posts, setPosts] = useState<post[]>([]);
  const [rating, setRating] = useState<number>(4);
  const [user, setUser] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
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
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getAllPosts();
  }, []);
  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (error) {
      console.log(error);
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
    <div className={`homeContainer ${isPopupOpen ? "blur" : ""}`}>
      <header>
        <h1>
          <Link to={"/home"}>Blog Post.</Link>
        </h1>
        <div className="profileAndSearchContainer">
          <Link to={"/profile"}>your profile 👮‍♂️ :{user}</Link>
          <div>
            <input
              type="text"
              placeholder="search for post"
              onChange={(e) => setuserQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </header>
      <div className="postAndSystemOptionsContainer">
        <div className="sytemOptions">
          <button>categories</button>
          <button>View your Profile</button>
          <button>Create your Post</button>
          <button onClick={handleLogout}>logout</button>
          <button>Notifications</button>
          <button>your posts</button>
          <button>videos</button>
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
                      <p>rating :{post.rating.toFixed(1)}</p>
                      <button onClick={() => handleLikes(post._id)}>
                        🤍 {post.likes}
                      </button>
                      <button onClick={() => handleCommentClick(post._id)}>
                        🖊 comment
                      </button>
                    </div>

                    <Rating
                      postId={post._id}
                      initialRating={post.rating}
                      user={post.user}
                      updateRating={updateRating}
                    />
                  </div>
                </div>
                <form className="addComment" action="">
                  <input
                    className="addComment"
                    type="text"
                    placeholder="leave a comment"
                  />
                  <input type="submit" value={"add"} />
                </form>
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
                        <small>{new Date(comment.date).toLocaleString()}</small>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          {posts.length === 0 && <div className="eachPost">No posts Found</div>}
        </div>
      </div>

      {selectedPostId && (
        <CommentPopup postId={selectedPostId} onClose={closePopup} />
      )}
    </div>
  );
};

export default HomePage;
