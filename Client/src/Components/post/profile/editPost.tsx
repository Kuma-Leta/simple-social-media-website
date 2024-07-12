import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "../../../axiosConfig";

interface Post {
  _id: string;
  author: string;
  textContent: string;
  categories: string;
  imageContent?: string;
  videoContent?: string;
  user: string;
}

const EditPost: React.FC = () => {
  const { state } = useLocation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(state?.post);
  const [author, setAuthor] = useState(post?.author || "");
  const [category, setCategory] = useState(post?.categories || "");
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
            `http://localhost:5000/api/posts/${id}`
          );
          setPost(response.data);
          setAuthor(response.data.author);
          setCategory(response.data.categories);
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
        `http://localhost:5000/api/posts/${id}`,
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="textContent">Message</label>
          <textarea
            rows={4}
            name="textContent"
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="imageContent">Choose Image</label>
          <input
            type="file"
            name="imageContent"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div>
          <label htmlFor="videoContent">Choose Video</label>
          <input
            type="file"
            name="videoContent"
            onChange={handleFileChange}
            accept="video/*"
          />
        </div>
        <div>
          <input type="submit" value="Update Post" />
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default EditPost;
