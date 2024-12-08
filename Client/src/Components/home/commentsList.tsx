import { Post } from "../../store/postSlice";
import { formatDistanceToNow } from "date-fns";
import "../../styles/comment.css";
import { FormEvent, useEffect, useState } from "react";
import axios from "../../axiosConfig";
import socket from "./connectSocket";
import { useSelector } from "react-redux";
import { selectUsername } from "../../store/userSlice";

const CommentsList: React.FC<Post> = ({ post }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments);
  const user = useSelector(selectUsername);
  useEffect(() => {}, [comments]);
  const handleAddComment = async (event: FormEvent) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:5000/api/giveComment", {
      comment: commentText,
      postId: post._id,
    });
    const newComment = response.data.savedComment;
    setComments([...comments, newComment]);
    setCommentText("");
    socket.emit("new comment", {
      user: user?._id,
      postId: post._id,
      postOwner: post.user,
      content: commentText,
      type: "comment",
    });
  };
  return (
    <div className="commentsContainer bg-gray-100  max-sm:hidden overflow:hidden">
      <h3>Comments</h3>
      {comments.length === 0 && (
        <p className="noComments">No Comments yet be the first to comment</p>
      )}
      <ul>
        {[...comments]
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((comment) => (
            <li key={comment._id} className="comment">
              <p className="whitespace:nowrap">{comment.comment}</p>
              <p>
                <small className="whitespace:nowrap">by {comment.user}</small>
              </p>
              <p>
                <small>
                  {formatDistanceToNow(new Date(comment.date), {
                    addSuffix: true,
                  })}
                </small>{" "}
              </p>
            </li>
          ))}
      </ul>
      <form onSubmit={handleAddComment} className="addComment">
        <input
          // className="addComment"
          type="text"
          placeholder="leave a comment"
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
        />
        {/* <input type="submit" value={"add"} /> */}
        {commentText && (
          <button
            type="submit"
            // onClick={() => dispatch(AddComment({ postId: post._id }))}
            // disabled={!commentText}
            className="fas fa-paper-plane"
          ></button>
        )}
      </form>
    </div>
  );
};
export default CommentsList;
