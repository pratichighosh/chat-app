import React, { useState } from "react";

const ChatInterface = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="p-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border rounded p-2 mb-2"
        rows="3"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInterface;
