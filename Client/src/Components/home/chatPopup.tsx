import React, { FormEvent, useState } from "react";
import Chat from "./chatInterface";
interface ChatPopupProps {
  isVisible: boolean;
  onClose: () => void;
  recipient: string;
  onSendMessage: (message: string) => void;
  chatHistory: Chat[];
}

const ChatPopup: React.FC<ChatPopupProps> = ({
  isVisible,
  onClose,
  recipient,
  onSendMessage,
  chatHistory,
}) => {
  const [message, setMessage] = useState("");

  if (!isVisible) return null;

  const handleSend = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="fixed z-50 inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-96 p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{`Chat with `}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto max-h-80 p-4 bg-gray-50 rounded-lg shadow-inner">
          {/* Sent Message */}
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${
                chat.senderId === recipient ? "justify-start" : "justify-end"
              } mb-2`}
            >
              <div
                className={`max-w-xs ${
                  chat.senderId === recipient
                    ? "bg-gray-200 text-gray-800"
                    : "bg-blue-500 text-white"
                } p-3 rounded-lg shadow`}
              >
                {chat.message}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <textarea
            className="w-full h-20 border rounded-lg p-2"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={(e) => handleSend(e)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
