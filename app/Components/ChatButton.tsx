import React, { useState } from 'react';
import ChatInterface from '../Components/ChatInterface';

export default function ChatButton() {
  const [showChat, setShowChat] = useState(false);

  const handleChatClick = () => {
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  return (
    <>
      <button
        onClick={handleChatClick}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
      >
        <span className="material-icons text-xl">chat</span>
        Chat
      </button>
      {showChat && <ChatInterface onClose={handleCloseChat} />}
    </>
  );
}
