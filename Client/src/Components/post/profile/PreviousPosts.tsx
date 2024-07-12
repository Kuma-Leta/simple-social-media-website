import React, { useEffect, useState } from "react";
import axios from "../../../axiosConfig";
import "../../../styles/profile/previousPost.css";
import { useNavigate } from "react-router-dom";
interface Post {
  _id: string;
  author: string;
  imageContent: string;
  videoContent: string;
  rating: number;
  textContent: string;
}

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
    <div>
      <h1>All Posts</h1>
      <div className="container">
        {previousPosts.map((post, index) => (
          <div className="eachPost" key={post._id}>
            <div className="postDropdown">
              <button onClick={() => toggleDropdown(post._id)}>...</button>
              {dropdownVisible === post._id && (
                <div className="dropdownMenu">
                  <button onClick={() => handleEdit(post)}>Edit post</button>
                  <button onClick={() => handleDelete(post._id)}>
                    Delete post
                  </button>
                </div>
              )}
            </div>
            <p>Author 🌟:{post.author}</p>
            <p> message :{post.textContent}</p>
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
            <p>rating :{post.rating.toFixed(1)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousPosts;
