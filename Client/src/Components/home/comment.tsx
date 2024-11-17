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
    <div className=" font-serif fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className=" relative bg-white w-11/12 md:w-3/4 lg:w-1/2 rounded-lg shadow-lg p-6 overflow-y-auto max-h-screen">
        <button
          className=" absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-600 focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <div className=" bg-white p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {Post?.author}'s Post
          </h2>
          <p className="text-gray-600 text-sm mb-2">
            <span className="font-bold">Author:</span> {Post?.author}
          </p>
          <p className="text-gray-700 leading-relaxed mb-4 text-justify">
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

        <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4">
          Comments
        </h3>
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">No Comments Yet</p>
        ) : (
          <ul className=" space-y-4">
            {comments
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((comment) => (
                <li
                  key={comment._id}
                  className="bg-gray-100 p-3 rounded-lg shadow-sm"
                >
                  <p className="text-gray-800">{comment.comment}</p>
                  <p className="text-sm text-gray-500">
                    <small>by {comment.user}</small>
                  </p>
                  <p className="text-sm text-gray-400">
                    <small>{new Date(comment.date).toLocaleString()}</small>
                  </p>
                </li>
              ))}
          </ul>
        )}

        <form
          className="mt-6 flex items-center space-x-2"
          onSubmit={(e) => addComment(e, postId)}
        >
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className=" flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Leave a comment"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};
export default CommentPopup;
