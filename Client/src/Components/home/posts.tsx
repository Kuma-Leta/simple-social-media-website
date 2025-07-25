import { Post } from "../../store/postSlice";
import Rating from "./handleRating";
import axios from "../../axiosConfig";
import { useState } from "react";
import CommentPopup from "./comment";
import "../../styles/styles.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUsername } from "../../store/userSlice";
import { endpoint } from "../../constants/constants";

interface PostsProps {
  post: Post;
}

const Posts: React.FC<PostsProps> = ({ post }) => {
  const [showmore, setShowMore] = useState(false);
  const [Close, setOnclose] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [rating, setRating] = useState(post.rating);
  const navigate = useNavigate();
  const user = useSelector(selectUsername);
  // const [toggleShowMore, setToggleShowMore] = useState((prev) => !prev);
  console.log("post", post);
  const handleLikes = async (postId: string) => {
    const result = await axios.post(`${endpoint}/api/likePost`, {
      postId,
    });

    setLikes(result.data.post.likes);
  };
  function handleFollowing() {}
  const onClose = () => {
    setOnclose(false);
  };
  const updateRating = async (newValue: number) => {
    // dispatch({ type: "SET_RATING", payload: newValue });
    setRating(newValue);
  };
  //   const updatedPosts = posts.map((post) =>
  //     post._id === postId
  //       ? { ...post, likes: result.data.updatedPost.likes }
  //       : post
  //   );
  const handleCommentClick = (postId: string) => {
    if (postId === post._id) {
      setOnclose(true);
    }
  };
  return (
    <div className="eachPost">
      <div className="postDropdown">{/* <button>...</button> */}</div>
      <p className=" inline flex items center justify-between space-x-2 whitespace:nowrap">
        <span
          className="ronded cursor-pointer hover:underline "
          onClick={() => navigate("/authorProfile", { state: post })}
        >
          . <i className="fas fa-user mr-2"></i>
          Author :{post.author}
        </span>{" "}
        {post.user !== user?._id && (
          <button
            className="text-blue-500 flex flex-end"
            onClick={handleFollowing}
          >
            + Follow
          </button>
        )}
        <span>&bull; &bull; &bull;</span>
      </p>
      <p className="textContent text-justify inline">
        {showmore ? post.textContent : post.textContent?.substring(0, 100)}
        {post.textContent?.length > 100 && (
          <button
            className="text-blue-500 underline mt-2"
            onClick={() => setShowMore(!showmore)}
          >
            {showmore ? " Show less" : " Read more"}
          </button>
        )}
      </p>

      {post.imageContent && (
        <div>
          <img
            className="w-full rounded-lg"
            src={`${endpoint}/uploads/${post.imageContent.replace(/\\/g, "/")}`}
            alt="Post"
          />
        </div>
      )}
      {post.videoContent && (
        <div className="">
          <video
            className="w-full rounded-lg"
            src={`${endpoint}/${post.videoContent.replace(/\\/g, "/")}`}
            controls
          />
        </div>
      )}
      <div className="LCcontainer ">
        <div className="likeAndComment">
          <div className="likeRatingComment flex sm:flex-wrap">
            <p className="whitespace-nowrap">
              <i className="fas fa-star"></i>:{rating}
            </p>
            <button
              className={`whitespace-nowrap ${
                likes > post.likes ? "text-blue-500" : ""
              }`}
              onClick={() => handleLikes(post._id)}
            >
              <i className="fas fa-thumbs-up"></i>
              {likes}
            </button>
            <button
              className="whitespace-nowrap"
              onClick={() => handleCommentClick(post._id)}
            >
              <i className="fas fa-comment"></i>
              comment
            </button>
            {post.user !== user?._id && (
              <Rating
                postId={post._id}
                postOwner={post.user}
                initialRating={post.amount}
                updateRating={updateRating}
                raterId={user._id}
                rater={user?.firstName + " " + user?.lastName}
              />
            )}
          </div>
        </div>
      </div>
      {Close && (
        <CommentPopup onClose={onClose} postId={post._id} post={post} />
      )}
    </div>
  );
};
export default Posts;
