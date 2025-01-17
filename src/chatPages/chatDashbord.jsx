import Userleft from "./userleft";
import UserLeftChat from "./userleftchat";
// import React from "react";
const ChatDashboard = () => {
  return (
    <>
      <div className="flex flex-row">
        <Userleft />
        <UserLeftChat />
        <p>All chat</p>
      </div>
    </>
  );
};

export default ChatDashboard;
