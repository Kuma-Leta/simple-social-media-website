import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SystemOverview: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      // const authToken = localStorage.getItem("authToken");
      // if (authToken) navigate("/home");
    };
    checkLogin();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-600 text-white p-4">
        <div className=" mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to="/systemOverview" className="hover:text-gray-200">
              Blog Post.
            </Link>
          </h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#home" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section id="home" className="bg-white py-16 text-center">
        <h1 className="text-4xl font-bold">Welcome to our Blog</h1>
        <p className="mt-4 text-lg">
          Share your thoughts, stories, and experiences with our community!
        </p>
        <div className="mt-8 space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Signup
          </Link>
        </div>
      </section>

      <section id="about" className="bg-gray-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">About Us</h2>
          <p className="mt-4 text-lg">
            Welcome to our Blog, a platform where users can share their
            thoughts, stories, and experiences across various categories.
          </p>
        </div>
      </section>

      <section id="services" className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Our Services</h2>
          <ul className="mt-8 space-y-8">
            <li>
              <h3 className="text-2xl font-bold">Blog Posting</h3>
              <p className="mt-2">
                Create and share your blog posts in various categories.
              </p>
            </li>
            <li>
              <h3 className="text-2xl font-bold">Community Interaction</h3>
              <p className="mt-2">
                Engage with other users through comments and discussions.
              </p>
            </li>
            <li>
              <h3 className="text-2xl font-bold">Personalized Feed</h3>
              <p className="mt-2">
                Get personalized content recommendations based on your
                interests.
              </p>
            </li>
            <li>
              <h3 className="text-2xl font-bold">User Profiles</h3>
              <p className="mt-2">
                Create a profile to showcase your posts and connect with others.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section id="contact" className="bg-gray-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="mt-4">
            Feel free to reach out to us with questions or feedback!
          </p>
          <p>
            Email:{" "}
            <a href="mailto:kumaleta2021@gmail.com" className="text-blue-600">
              info@yourblogname.com
            </a>
          </p>
          <p>Phone: +123-456-7890</p>
          <form
            action="mailto:kumaleta2021@gmail.com"
            method="post"
            className="mt-8 space-y-4 max-w-md mx-auto"
          >
            <div className="flex flex-col">
              <label htmlFor="name" className="text-left">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-left">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="text-left">
                Your Message:
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="border border-gray-300 rounded px-4 py-2"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SystemOverview;
