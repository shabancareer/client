import React from "react";

const ChatBox = ({ user, chat }) => {
  if (!user) {
    return (
      <div className="text-center text-gray-500 p-4">
        Select a user to start chat
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold">{user.name}</h2>
      {chat ? (
        <p>Chat exists: {chat.id}</p>
      ) : (
        <p>No previous chat found, starting a new conversation.</p>
      )}
    </div>
  );
};

export default ChatBox;
