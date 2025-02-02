import { useState } from "react";
import UserProfile from "./userProfile";
import UserLeftChat from "./userleftchat";
import UserProfileSetting from "./userProfileSetting";
import Chatbox from "./Chatbox";

const ChatDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [photoUpdated, setPhotoUpdated] = useState(false); // Track photo update
  const handleShowProfile = (user) => {
    setSelectedUser(user); // Set the selected user data when clicked
    setPhotoUpdated(false); // Reset state when opening profile again
    console.log(user);
  };
  return (
    <>
      <div className="flex flex-row">
        <UserProfile onShowProfile={handleShowProfile} />
        {photoUpdated || !selectedUser ? (
          <UserLeftChat />
        ) : (
          <UserProfileSetting
            user={selectedUser}
            onPhotoUpdate={() => setPhotoUpdated(true)} // Callback to update UI
          />
        )}
        <div className="flex-1 bg-slate-500">
          <Chatbox />
        </div>
        {/* <UserProfileSetting /> */}
      </div>
    </>
  );
};

export default ChatDashboard;
