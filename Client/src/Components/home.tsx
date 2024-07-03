import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import axios from "../axiosConfig";
interface post {
  _id: string;
  author: string;
  textContent: string;
  imageContent: string;
  videoContent: string;
  rating: number;
}
const HomePage: React.FC = () => {
  const [userQuery, setuserQuery] = useState("");
  const [posts, setPosts] = useState<post[]>([]);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    const getAllPosts = async () => {
      try {
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
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = async () => {
    const postResult = await axios.post(
      "http://localhost:5000/api/searchByUserQuery",
      { userQuery }
    );
    setPosts(postResult.data.posts);
  };
  const getByCategory = async (category: string) => {
    try {
      if (category === "all") {
        const allPosts = await axios.get(
          "http://localhost:5000/api/getAllposts"
        );
        return setPosts(allPosts.data.posts);
      }
      const postByCategory = await axios.post(
        "http://localhost:5000/api/searchByCategory",
        { category }
      );
      if (postByCategory.data.posts === 0) {
        setPosts([]);
      }
      setPosts(postByCategory.data.posts);
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <div className="homeContainer">
      <h1>
        <Link to={"/home"}>Blog Post.</Link>
      </h1>
      <div className="profileAndSearchContainer">
        <Link to={"/profile"}>kuma leta</Link>
        <div>
          <input
            type="text"
            placeholder="search for post"
            onChange={(e) => setuserQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="categories">
        <h1>Categories</h1>
        <hr />
        <div className="items">
          <button onClick={() => getByCategory("all")}>All</button>
          <button onClick={() => getByCategory("marketing")}>Marketing</button>
          <button>technology</button>
          <button>politics</button>
          <button>sports</button>
          <button>Arts</button>
        </div>
      </div>
      <div className="postsContainer">
        {posts.map((post: post) => (
          <div className="eachPost" key={post._id}>
            <p>Author :{post.author}</p>
            <p> message :{post.textContent}</p>
            {post.imageContent && (
              <img src={`http://localhost:5000/api/${post.imageContent}`} />
            )}
            {post.videoContent && (
              <video src={`http://localhost:5000/api/${post.videoContent}`} />
            )}
            <p>rating :{post.rating}</p>
          </div>
        ))}
        {posts.length === 0 && <div className="eachPost">No posts Found</div>}
        {/* {error && <p>{error}</p>}s */}
      </div>
    </div>
  );
};
export default HomePage;
