import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "../../../axiosConfig";
import { Post } from "../../../store/postSlice";
// interface Post {
//   _id: string;
//   author: string;
//   textContent: string;
//   category: string;
//   imageContent?: string;
//   videoContent?: string;
//   user: string;
// }

const EditPost: React.FC = () => {
  const { state } = useLocation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(state?.post);
  const [author, setAuthor] = useState(post?.author || "");
  const [category, setCategory] = useState(post?.category || "");
  const [textContent, setTextContent] = useState(post?.textContent || "");
  const [imageContent, setImageContent] = useState<File | null>(null);
  const [videoContent, setVideoContent] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!state?.post) {
      // Fetch the post data if not passed through state
      const fetchPost = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/getSpecificPost/${id}`
          );
          setPost(response.data);
          setAuthor(response.data.author);
          setCategory(response.data.category);
          setTextContent(response.data.textContent);
        } catch (error) {
          console.error("Failed to fetch post", error);
        }
      };
      fetchPost();
    }
  }, [id, state?.post]);

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
      const response = await axios.put(
        `http://localhost:5000/api/editPost/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post updated:", response.data);
      setSuccessMessage("Post updated successfully!");
      navigate("/profile"); // Redirect to home page or show a success message
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Error updating post. Please try again.");
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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Author Input */}
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Author
            </label>
            <input
              type="text"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the author's name"
            />
          </div>

          {/* Category Input */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category
            </label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the category"
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label
              htmlFor="textContent"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Message
            </label>
            <textarea
              rows={4}
              name="textContent"
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 text-justify rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your message here"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="imageContent"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Choose Image
            </label>
            <input
              type="file"
              name="imageContent"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Video Upload */}
          <div>
            <label
              htmlFor="videoContent"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Choose Video
            </label>
            <input
              type="file"
              name="videoContent"
              onChange={handleFileChange}
              accept="video/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <input
              type="submit"
              value="Update Post"
              className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            />
          </div>
        </form>

        {/* Feedback Messages */}
        {error && (
          <p className="mt-4 text-sm text-red-600">
            <strong>Error:</strong> {error}
          </p>
        )}
        {successMessage && (
          <p className="mt-4 text-sm text-green-600">
            <strong>Success:</strong> {successMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default EditPost;
