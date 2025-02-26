import React from "react";

const ChatBox = ({ user, userChat }) => {
  // console.log(userChat.receiver.photo);
  const Uphoto = userChat?.receiver?.photo;
  const Uname = userChat?.receiver?.name;
  // console.log(Uphoto);

  const photo = user?.users.receiver.photo;
  const name = user?.users.receiver.name;
  const messages = user?.messages[0]?.content;

  if (!user || !userChat) {
    return (
      <div className="text-white p-4 bg-yellow-400">
        Select a user to start chat
      </div>
    );
  }

  return (
    <>
      <div className="p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold">{name || Uname}</h2>
        <img
          src={Uphoto || photo}
          alt={Uname || name}
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
