import { useState } from "react";
import UserProfile from "./userProfile";
import UserLeftChat from "./userleftchat";
import UserProfileSetting from "./userProfileSetting";

const ChatDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleShowProfile = (user) => {
    setSelectedUser(user); // Set the selected user data when clicked
    // console.log(user);
  };
  return (
    <>
      <div className="flex flex-row">
        <UserProfile onShowProfile={handleShowProfile} />

        {selectedUser ? (
          <UserProfileSetting user={selectedUser} />
        ) : (
          <UserLeftChat />
        )}
        {/* <UserProfileSetting /> */}
      </div>
    </>
  );
};

export default ChatDashboard;
