import React from "react";

interface Comment {
  _id: string;
  user: string;
  date: Date;
  comment: string;
}

interface Post {
  _id: string;
  author: string;
  textContent: string;
  imageContent: string;
  videoContent: string;
  rating: number;
  user: string;
  likes: number;
  comments: Comment[];
}

interface CommentPopupProps {
  onClose: () => void;
  postId: string;
  post: Post;
}

const CommentPopup: React.FC<CommentPopupProps> = ({ onClose, post }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 font-serif">
      <div className="relative bg-white w-11/12 md:w-3/4 lg:w-1/2 rounded-lg shadow-lg p-6 overflow-y-auto max-h-screen">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 focus:outline-none text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Post Content */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {post?.author}'s Post
          </h2>
          <p className="text-gray-600 text-sm mb-2">
            <span className="font-bold">Author:</span> {post?.author}
          </p>
          <p className="text-gray-700 leading-relaxed mb-4 text-justify">
            {post?.textContent}
          </p>

          {/* Image Content */}
          {post?.imageContent && (
            <div className="mb-4">
              <img
                className="w-full h-auto rounded-lg"
                src={`http://localhost:5000/${post?.imageContent}`}
                alt="Post Content"
              />
            </div>
          )}

          {/* Video Content */}
          {post?.videoContent && (
            <div className="mb-4">
              <video
                className="w-full rounded-lg"
                src={`http://localhost:5000/${post?.videoContent}`}
                controls
              />
            </div>
          )}
        </div>

        {/* Comments Section */}
        <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4">
          Comments
        </h3>
        {post.comments.length === 0 ? (
          <p className="text-gray-500 italic">No Comments Yet</p>
        ) : (
          <ul className="space-y-4">
            {post.comments.map((comment) => (
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

        {/* Comment Form */}
        <form className="mt-6 flex items-center space-x-2">
          <label htmlFor="comment-input" className="sr-only">
            Leave a comment
          </label>
          <input
            id="comment-input"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
