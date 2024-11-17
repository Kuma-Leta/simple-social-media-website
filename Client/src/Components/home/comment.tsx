import axios from "../../axiosConfig";
import React, { useEffect } from "react";
import { useState } from "react";
// import "../../styles/comment.css";
import { FormEvent } from "react";
// import post from './home'
interface Comment {
  _id: string;
  user: string;
  date: Date;
  comment: string;
}
interface CommentPopupProps {
  onClose: () => void;
  postId: string;
}
interface post {
  _id: string;
  author: string;
  textContent: string;
  imageContent: string;
  videoContent: string;
  rating: number;
  user: string;
  likes: number;
}
const CommentPopup: React.FC<CommentPopupProps> = ({ onClose, postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [Post, setPost] = useState<post | null>(null);
  const [comment, setComment] = useState("");
  const addComment = async (e: FormEvent<HTMLFormElement>, postId: string) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:5000/api/giveComment", {
      postId,
      comment,
    });
    comments.push(result.data.savedComment);
    comments.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setComment("");
  };
  useEffect(() => {
    const getComments = async () => {
      const result = await axios.get(
        `http://localhost:5000/api/getSpecificPost/${postId}`
      );
      console.log(result);
      setPost(result.data.post);
      setComments(result.data.post.comments);
    };
    getComments();
  }, [postId]);
  return (
    <div className="popup">
      <div className="popupContent relative block ">
        <button
          className="closeButton sticky top-0 z-10 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="post bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {Post?.author}'s Post
          </h2>
          <p className="text-gray-600 text-sm mb-2">
            <span className="font-bold">Author:</span> {Post?.author}
          </p>
          <p className="text-gray-700 leading-relaxed mb-4 text-justify font-serif">
            {Post?.textContent}
          </p>
          {Post?.imageContent && (
            <div className="mb-4">
              <img
                className="w-full h-auto rounded-lg"
                src={`http://localhost:5000/${Post?.imageContent}`}
                alt="Post?"
              />
            </div>
          )}
          {Post?.videoContent && (
            <div className="mb-4">
              <video
                className="w-full rounded-lg"
                src={`http://localhost:5000/${Post?.videoContent}`}
                controls
              />
            </div>
          )}
        </div>

        <h3>Comments</h3>
        {comments.length === 0 && <p className="noComments">No Comments Yet</p>}
        <ul className="commentList">
          {comments
            .sort((a, b) => {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            })
            .map((comment) => (
              <li key={comment._id}>
                <p>{comment.comment}</p>
                <p>
                  <small>by {comment.user}</small>
                </p>
                <p>
                  <small>{new Date(comment.date).toLocaleString()}</small>
                </p>
              </li>
            ))}
          <form onSubmit={(e) => addComment(e, postId)}>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="addComment"
              type="text"
              placeholder="leave a comment"
            />
            //
          </form>
        </ul>
      </div>
    </div>
  );
};
export default CommentPopup;
