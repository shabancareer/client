import React from "react";
import TypeMessage from "./Typemessage";

const ChatBox = ({ user }) => {
  // console.log("chat box up==", user);
  if (!user) {
    return (
      <div className="text-white p-4 bg-yellow-400">
        Select a user to start chat
      </div>
    );
  }
  // Handle both structures
  const isFromSearch = user?.users && user?.messages;
  const receiver = isFromSearch ? user.users.receiver : user.receiver;
  const name = receiver?.name;
  const photo = receiver?.photo;
  const messages = isFromSearch ? user.messages : user.messages || [];
  // console.log(messages);
  return (
    <>
      <div className="p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold">{name}</h2>
        <img
          src={photo}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>
      <div>
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded ${
                msg.senderId === receiver?.id
                  ? "bg-gray-200 text-black self-start"
                  : "bg-blue-500 text-white self-end"
              }`}
            >
              {msg.content}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages yet.</p>
        )}
      </div>
    </>
  );
};

export default ChatBox;
