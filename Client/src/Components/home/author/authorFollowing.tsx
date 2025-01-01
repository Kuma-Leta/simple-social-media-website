import React, { useEffect, useState } from "react";
import axios from "../../../axiosConfig";

interface Following {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

interface AuthorProps {
  post: {
    user: string;
  };
}

const AuthorFollowing: React.FC<AuthorProps> = ({ post }) => {
  const [followings, setFollowings] = useState<Following[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getFollowing() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/followings/${post.user}`
        );
        setFollowings(response.data.followings);
      } catch (error) {
        console.error("Error fetching followings:", error);
      } finally {
        setLoading(false);
      }
    }
    getFollowing();
  }, [post.user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="font-bold text-xl mb-4">{post.author} is Following:</h3>
      {followings.length > 0 ? (
        <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {followings.map((following) => (
            <li
              key={following._id}
              className="p-4 bg-gray-100 rounded-lg shadow-md hover:pointer"
            >
              <p className="text-lg font-medium">
                {following.firstName} {following.lastName}
              </p>
              <p className="text-sm text-gray-600">{following.email}</p>
              <p className="text-xs text-gray-400">
                Following since:{" "}
                {new Date(following.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No followings found.</p>
      )}
    </div>
  );
};

export default AuthorFollowing;
