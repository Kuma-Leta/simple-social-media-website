import { io } from "socket.io-client";
import axios from "../../axiosConfig";
const socket = io("http://localhost:5000");

export const fetchUser = async () => {
  const token = localStorage.getItem("authToken");

  if (token) {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/getUser/${token}`
      );
      return response.data.User; // Return the user data
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null; // Handle errors gracefully
    }
  }
  return null; // No token found
};

export default socket;
