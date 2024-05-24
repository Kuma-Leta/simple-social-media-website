import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
const HomePage: React.FC = () => {
  const [searchItem, setSearchItem] = useState("");
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = () => {
    console.log(searchItem);
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
            onChange={(e) => setSearchItem(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="categories">
        <h1>Categories</h1>
        <hr />
        <div className="items">
          <button>All</button>
          <button>Marketing</button>
          <button>technology</button>
          <button>politics</button>
          <button>sports</button>
          <button>Arts</button>
        </div>
      </div>
      <div className="postsContainer">
        {/* posts will be mapped*/}
        <div className="eachPost"></div>
      </div>
    </div>
  );
};
export default HomePage;
