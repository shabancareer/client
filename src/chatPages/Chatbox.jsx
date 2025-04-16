import React from "react";

const ChatBox = ({ user }) => {
  console.log("Chatbox users:=", user);
  // const messageContents = user.messages.map((msg) => msg.content);
  // console.log(messageContents);
  // const photo = user?.users?.receiver?.photo;
  const names = user?.users?.receiver?.name;
  // const messages = user?.messages[0]?.content;
  // console.log(names);
  if (!user) {
    return (
      <div className="text-white p-4 bg-yellow-400">
        Select a user to start chat
      </div>
    );
  }
  const isProcessedChat = user?.users && user?.messages;
  const photo = user.receiver?.photo;
  const name = user.receiver?.name;
  // console.log("Clicked user:=", name);
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
        <p>{messageContents}</p>
      </div>
    </>
  );
};

export default ChatBox;
