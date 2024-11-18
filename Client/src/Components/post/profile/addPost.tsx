import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";
const AddPost: React.FC = () => {
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [textContent, setTextContent] = useState("");
  const [imageContent, setImageContent] = useState<File | null>(null);
  const [videoContent, setVideoContent] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("author", author);
    formData.append("textContent", textContent);
    formData.append("category", category);

    if (imageContent) {
      formData.append("imageContent", imageContent);
    }
    if (videoContent) {
      formData.append("videoContent", videoContent);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/addPost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post created:", response.data);
      setSuccessMessage("Post created successfully!");
      clearForm();
      navigate("/profile");
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Error creating post. Please try again.");
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files) {
      if (name === "imageContent") {
        setImageContent(files[0]);
      } else if (name === "videoContent") {
        setVideoContent(files[0]);
      }
    }
  };

  const clearForm = () => {
    setAuthor("");
    setCategory("");
    setTextContent("");
    setImageContent(null);
    setVideoContent(null);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter a category"
            required
          />
        </div>

        <div>
          <label
            htmlFor="textContent"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            rows={4}
            name="textContent"
            id="textContent"
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Write your message here..."
            required
          />
        </div>

        <div>
          <label
            htmlFor="imageContent"
            className="block text-sm font-medium text-gray-700"
          >
            Choose Image
          </label>
          <input
            type="file"
            name="imageContent"
            id="imageContent"
            onChange={handleFileChange}
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="videoContent"
            className="block text-sm font-medium text-gray-700"
          >
            Choose Video
          </label>
          <input
            type="file"
            name="videoContent"
            id="videoContent"
            onChange={handleFileChange}
            accept="video/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Post
          </button>
        </div>
      </form>

      {error && (
        <p className="mt-4 text-red-600 text-sm font-medium">{error}</p>
      )}
      {successMessage && (
        <p className="mt-4 text-green-600 text-sm font-medium">
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default AddPost;
