import React from "react";

const ChatBox = ({ user }) => {
  console.log("Chatbox users:=", user);

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
  // const photo = user.receiver?.photo;
  // const name = user.receiver?.name;
  // console.log("isFromSearch Or chat user", receiver);
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
      <div>{/* <p>{messageContents}</p> */}</div>
    </>
  );
};

export default ChatBox;
