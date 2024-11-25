import React, { useState, useEffect } from "react";
import { Post } from "../../../store/postSlice";
import axios from "../../../axiosConfig";
import Posts from "../posts";

export interface AuthorProps {
  post: Post;
}

const AuthorPosts: React.FC<AuthorProps> = ({ post }) => {
  const [authorPosts, setAuthorPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!post.user) return; // Ensure post.user is defined
    async function getAuthorPosts() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/getAuthorPosts/${post.user}`
        );
        setAuthorPosts(response.data.authorPosts);
      } catch (error) {
        console.error("Error fetching author posts:", error);
      }
    }
    getAuthorPosts();
  }, [post.user]); // Dependency array ensures effect runs only when post.user changes

  return (
    <>
      {authorPosts.map((authorPost: Post, index) => (
        <Posts post={authorPost} key={index} />
      ))}
    </>
  );
};

export default AuthorPosts;
