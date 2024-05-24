import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "../../axiosConfig";

const AddPost: React.FC = () => {
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [textContent, setTextContent] = useState("");
  const [imageContent, setImageContent] = useState<File | null>(null);
  const [videoContent, setVideoContent] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
          <input type="submit" value="Post" />
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default AddPost;
