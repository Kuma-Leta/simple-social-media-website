import React, { useEffect, useState } from "react";
import axios from "../../../axiosConfig";

interface Follower {
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

const AuthorFollowers: React.FC<AuthorProps> = ({ post }) => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getFollowing() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/getFollowers/${post.user}`
        );
        setFollowers(response.data.followings);
      } catch (error) {
        console.error("Error fetching followers:", error);
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
      <h3 className="font-bold text-xl mb-4">{post.user} Followers:</h3>
      {followers?.length > 0 ? (
        <ul className="space-y-2">
          {followers.map((follower) => (
            <li
              key={follower._id}
              className="p-4 bg-gray-100 rounded-lg shadow-md hover:pointer"
            >
              <p className="text-lg font-medium">
                {follower.firstName} {follower.lastName}
              </p>
              <p className="text-sm text-gray-600">{follower.email}</p>
              <p className="text-xs text-gray-400">
                Following since:{" "}
                {new Date(follower.createdAt).toLocaleDateString()}
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

export default AuthorFollowers;
