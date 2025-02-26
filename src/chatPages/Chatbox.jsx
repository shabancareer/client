import React from "react";

const ChatBox = ({ user }) => {
  console.log(user?.messages[0]?.content);
  const photo = user?.users.receiver.photo;
  const name = user?.users.receiver.name;
  const messages = user?.messages[0]?.content;
  // console.log("Chat Box chat=", photo);
  // console.log("Chat Box chat=", name);
  if (!user) {
    return (
      <div className="text-white p-4 bg-yellow-400">
        Select a user to start chat
      </div>
    );
  }

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
        <p>{messages}</p>
      </div>
    </>
  );
};

export default ChatBox;
