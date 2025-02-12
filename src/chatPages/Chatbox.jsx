import React from "react";

const ChatBox = ({ user, chat }) => {
  // console.log("Chat Box user=", user);
  // console.log("Chat Box chat=", chat);
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
      <img
        src={user.photo}
        alt={user.name}
        className="w-16 h-16 rounded-full object-cover"
      />
      {/* {chat ? (
        <p>Chat exists: {chat.id}</p>
      ) : (
        <p>No previous chat found, starting a new conversation.</p>
      )} */}
      <div>{/* <p>jhj</p> */}</div>
    </div>
  );
};

export default ChatBox;
