import { Post, selectPosts } from "../../store/postSlice";
import Rating from "./handleRating";
import axios from "../../axiosConfig";
import { useSelector } from "react-redux";
const Posts: React.FC<Post> = ({ post }) => {
  const posts = useSelector(selectPosts);
  const handleLikes = async (postId: string) => {
    const result = await axios.post("http://localhost:5000/api/likePost", {
      postId,
    });
  };
  const updateRating = async (newValue: number) => {
    // dispatch({ type: "SET_RATING", payload: newValue });
  };
  //   const updatedPosts = posts.map((post) =>
  //     post._id === postId
  //       ? { ...post, likes: result.data.updatedPost.likes }
  //       : post
  //   );
  return (
    <div className="eachPost">
      <div className="postDropdown">{/* <button>...</button> */}</div>
      <p className="author">
        <span className="onlinePresense">.</span> Author :{post.author}
      </p>
      <p className="textContent"> {post.textContent}</p>
      {post.imageContent && (
        <div>
          <img src={`http://localhost:5000/${post.imageContent}`} alt="Post" />
        </div>
      )}
      {post.videoContent && (
        <div>
          <video src={`http://localhost:5000/${post.videoContent}`} controls />
        </div>
      )}
      <div className="LCcontainer">
        <div className="likeAndComment">
          <div className="likeRatingComment">
            <p>
              <i className="fas fa-star"></i>:{post.rating.toFixed(1)}
            </p>
            <button onClick={() => handleLikes(post._id)}>
              <i className="fas fa-thumbs-up"></i>
              {post.likes}
            </button>
            <button onClick={() => handleCommentClick(post._id)}>
              <i className="fas fa-comment"></i>
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
  );
};
export default Posts;
