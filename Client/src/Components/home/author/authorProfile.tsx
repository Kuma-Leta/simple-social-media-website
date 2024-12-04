import Header from "../header";
import ChatPopup from "../chatPopup";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthorPosts from "./authorPosts";
import AboutAuthor from "./aboutAuthor";
import AuthorFollowing from "./authorFollowing";
import AuthorFollowers from "./authorsFollowers";
import AuthorVideos from "./authorsVideos";
import AuthorPhotos from "./authorPhotos";
import socket from "../connectSocket";
import axios from "../../../axiosConfig";
import Chat from "../chatInterface";
import { useSelector } from "react-redux";
import { selectUsername } from "../../../store/userSlice";
const AuthorProfile: React.FC = () => {
  const [isChatPopupVisible, setIsChatPopupVisible] = useState(false);
  const [tab, setTab] = useState("posts");
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const location = useLocation();
  const post = location.state;
  const user = useSelector(selectUsername);
  const roomId = [user?._id, post.user].sort().join("_");
  const userId = user?._id;
  useEffect(() => {
    const getChatHistory = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/getHistory/${roomId}`
      );
      if (response.data) setChatHistory(response.data);
    };
    getChatHistory();
  }, []);
  useEffect(() => {
    socket.emit("join room", { roomId, userId });
    socket.on("receive message", (data) => {
      setChatHistory((prevHist) => [...prevHist, data]);
    });
    return () => socket.off("receive message");
  }, []);
  // console.log(post);
  function handleSendMessage(message: string) {
    const data = {
      senderId: user?._id,
      receiverId: post.user,
      message: message,
      roomId,
    };
    socket.emit("send message", data);
  }
  function setTabContent() {
    switch (tab) {
      case "posts":
        return <AuthorPosts post={post} />;

      case "about":
        return <AboutAuthor post={post} />;

      case "videos":
        return <AuthorVideos post={post} />;
      case "photos":
        return <AuthorPhotos post={post} />;
      case "followers":
        return <AuthorFollowers post={post} />;
      case "following":
        return <AuthorFollowing post={post} />;
    }
  }
  const tabs = [
    { name: "posts", path: "/authorProfile/posts" },
    { name: "about", path: "/authorProfile/about" },
    { name: "videos", path: "/authorProfile/videos" },
    { name: "photos", path: "/authorProfile/photos" },
    { name: "followers", path: "/authorProfile/followers" },
    { name: "following", path: "/authorProfile/following" },
  ];
  return (
    <div>
      <Header />
      <div className=" shadow-md rouded-lg">
        <div className="flex justify-between items-center mt-2 p-3">
          <div className="whitespace:nowwrap">
            <i className="fas fa-user"></i>
            <span className="text-gray-700 font-semibold">{post.author}</span>
          </div>
          <div className=" flex gap-3 justify-between ">
            {user?._id !== post?.user && (
              <button
                onClick={() => setIsChatPopupVisible(true)}
                className="bg-blue-500 hover:bg-blue-600 rounded-lg p-2 text-white"
              >
                Messsage
              </button>
            )}
            <span>
              <input
                type="text"
                className="rounded-lg px-2 py-2   focus:ring-blue-500 focus:outline-none text-black border border-blue-500"
                placeholder={`search in ${post.author} post,comments`}
              />
            </span>
          </div>
        </div>
        <hr className="w-full  mt-2 border-t border-gray-300 mt-2" />
        <div className="flex align-center justify-center space-x-3 capitalize p-2 ">
          {tabs.map((tabName, index) => (
            <button
              className="hover:text-blue-500 hover:underline "
              key={index}
              onClick={() => setTab(tabName.name)}
            >
              {tabName.name}
            </button>
          ))}
        </div>
        <hr className="w-full  mt-2 border-t border-gray-300 mt-2" />

        <div className="w-1/2 justify-center align-center p-3 grid gap-2 mx-auto">
          {setTabContent()}
        </div>
        <ChatPopup
          isVisible={isChatPopupVisible}
          onClose={() => setIsChatPopupVisible(false)}
          recipient={post.user}
          onSendMessage={handleSendMessage}
          chatHistory={chatHistory}
        />
      </div>
    </div>
  );
};
export default AuthorProfile;
