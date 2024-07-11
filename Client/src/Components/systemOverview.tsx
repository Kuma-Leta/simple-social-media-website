import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/systemOverview.css";
const SystemOverview: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    function checkLogin() {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        navigate("/home");
      }
    }
    checkLogin();
  }, []);
  return (
    <div className="systemOverviewContainer">
      <header className="header">
        <h1>
          <Link to={"/systemOverview"}>Blog Post.</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      <section id="home">
        <h1>Welcome to our Blog </h1>
        <p>Share your thoughts, stories, and experiences with our community!</p>
        <div className="loginAndSignupContainer">
          <Link to="/login">login</Link>

          <Link to="/signup">signup</Link>
        </div>
      </section>

      <section id="about">
        <h2>About Us</h2>
        <p>
          Welcome to our Blog , a platform where users can share their thoughts,
          stories, and experiences across various categories. Our mission is to
          provide a space for everyone to express themselves freely and connect
          with a community of like-minded individuals.
        </p>
        <p>
          Whether you're interested in technology, lifestyle, travel, or any
          other topic, you'll find a category that suits your interests. Join us
          and start sharing your voice today!
        </p>
      </section>

      <section id="services">
        <h2>Our Services</h2>
        <ul>
          <li>
            <h2>
              <strong>Blog Posting:</strong>
            </h2>
            <p>
              Create and share your blog posts in various categories such as
              technology, lifestyle, travel, and more.
            </p>
          </li>
          <li>
            <h2>Community Interaction:</h2>
            <p>
              Engage with other users through comments and discussions on blog
              posts.
            </p>
          </li>
          <li>
            <h2>Personalized Feed:</h2>
            <p>
              Get personalized content recommendations based on your interests
              and activities.
            </p>
          </li>
          <li>
            <h2>User Profiles:</h2>
            <p>
              {" "}
              Create a personalized profile to showcase your posts and connect
              with other users.
            </p>
          </li>
        </ul>
      </section>
      <section id="contact">
        <div className="contactList">
          <h2>Contact Us</h2>
          <p>
            If you have any questions, feedback, or suggestions, feel free to
            reach out to us. We'd love to hear from you!
          </p>
          <p>
            Email:{" "}
            <a href="mailto:kumaleta2021@gmail.com">info@yourblogname.com</a>
          </p>
          <p>Phone: +123-456-7890</p>
          <p>Address: 123 Blog Street, Blog City, BC 12345</p>
        </div>
        <form
          action="mailto:kumaleta2021@gmail.com"
          method="post"
          encType="text/plain"
        >
          <div className="nameAndEmail">
            <div className="name">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="email">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>
          <div className="message">
            <label htmlFor="message">Your Message:</label>
            <textarea id="message" name="message" rows={4} required></textarea>
          </div>
          <div className="submitBtn">
            <input type="submit" value="Send" />
          </div>
        </form>
      </section>
    </div>
  );
};
export default SystemOverview;
