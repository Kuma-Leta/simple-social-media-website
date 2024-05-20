import React from "react";
import { Link } from "react-router-dom";
const HomePage: React.FC = () => {
  return (
    <div className="homeContainer">
      <h1>
        <Link to={"/home"}>Blog Post.</Link>
      </h1>
      <div className="profileAndSearchContainer">
        <Link to={"/profile"}>kuma leta</Link>
        <div>
          <input type="submit" placeholder="search for post" />
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
