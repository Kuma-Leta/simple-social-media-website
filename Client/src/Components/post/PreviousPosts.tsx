import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";

interface Post {
  imageContent: string;
  videoContent: string;
  rating: number;
  textContent: string;
}

const PreviousPosts: React.FC = () => {
  const [previousPosts, setPreviousPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div>
      <h1>All Posts</h1>
      <div className="container">
        {previousPosts.map((post, index) => (
          <div key={index} className="post">
            <p>author : you</p>
            <p>text:{post.textContent}</p>
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
            <p>Rating: {post.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousPosts;
