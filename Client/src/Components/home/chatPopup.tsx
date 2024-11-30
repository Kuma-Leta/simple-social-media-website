import React, { useState } from "react";

interface ChatPopupProps {
  isVisible: boolean;
  onClose: () => void;
  recipient: string;
  onSendMessage: (message: string) => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({
  isVisible,
  onClose,
  recipient,
  onSendMessage,
}) => {
  const [message, setMessage] = useState("");

  if (!isVisible) return null;

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-96 p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{`Chat with ${recipient}`}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto max-h-80 p-4 bg-gray-50 rounded-lg shadow-inner">
          {/* Sent Message */}
          <div className="flex justify-end mb-2">
            <div className="max-w-xs bg-blue-500 text-white p-3 rounded-lg shadow">
              hi
            </div>
          </div>

          {/* Received Message */}
          <div className="flex justify-start mb-2">
            <div className="max-w-xs bg-gray-200 text-gray-800 p-3 rounded-lg shadow">
              hi, are you good?
            </div>
          </div>
        </div>

        <div className="mb-4">
          <textarea
            className="w-full h-20 border rounded-lg p-2"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
