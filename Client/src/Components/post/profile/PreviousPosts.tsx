import React, { useEffect, useState } from "react";
import axios from "../../../axiosConfig";
import "../../../styles/profile/previousPost.css";
import { useNavigate } from "react-router-dom";
import { Post } from "../../../store/postSlice";
// interface Post {
//   _id: string;
//   author: string;
//   imageContent: string;
//   videoContent: string;
//   rating: number;
//   textContent: string;
// }

const PreviousPosts: React.FC = () => {
  const [previousPosts, setPreviousPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPreviousPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/previousPosts"
        );
        setPreviousPosts(response.data.result);
      } catch (err) {
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };
    getPreviousPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  const toggleDropdown = (postId: string) => {
    setDropdownVisible(dropdownVisible === postId ? null : postId);
  };

  const handleEdit = (post: Post) => {
    navigate(`/profile/editPost/${post._id}`, { state: { post } });
  };

  const handleDelete = async (postId: string) => {
    try {
      prompt("are you sure you want to delete the post");
      await axios.delete(`http://localhost:5000/api/deletePost/${postId}`);
      setPreviousPosts(previousPosts.filter((post) => post._id !== postId));
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {previousPosts.map((post) => (
        <div
          key={post._id}
          className="relative bg-white shadow-lg rounded-xl p-6 transform transition hover:scale-105"
        >
          {/* Post Options Dropdown */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => toggleDropdown(post._id)}
              className="text-gray-500 hover:text-gray-800 text-lg"
            >
              &bull;&bull;&bull;
            </button>
            {dropdownVisible === post._id && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-xl">
                <button
                  onClick={() => handleEdit(post)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  ✏️ Edit Post
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  🗑️ Delete Post
                </button>
              </div>
            )}
          </div>

          {/* Post Content */}
          <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
            Author 🌟: {post.author}
          </h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {post.textContent}
          </p>

          {/* Media Content */}
          {post.imageContent && (
            <div className="mb-4">
              <img
                src={`http://localhost:5000/${post.imageContent}`}
                alt="Post"
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
          )}
          {post.videoContent && (
            <div className="mb-4">
              <video
                src={`http://localhost:5000/${post.videoContent}`}
                controls
                className="w-full rounded-lg"
              />
            </div>
          )}

          {/* Post Footer */}
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">
              <strong>Rating:</strong> {post.rating.toFixed(1)}
            </p>
            <button
              onClick={() => alert(`Viewing post by ${post.author}`)}
              className="text-blue-600 font-medium text-sm hover:underline"
            >
              View More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviousPosts;
