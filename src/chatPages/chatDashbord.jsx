import { useState } from "react";
import UserProfile from "./userProfile";
import UserProfileSetting from "./userProfileSetting";
import ChatBox from "./ChatBox";
import UserChats from "./UserChats";
// import { useSelector } from "react-redux";
const ChatDashboard = () => {
  // const userChats = useSelector((state) => state.chats);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [photoUpdated, setPhotoUpdated] = useState(false); // Track photo update
  const handleShowProfile = (user) => {
    setSelectedUser(user); // Set the selected user data when clicked
    setPhotoUpdated(false); // Reset state when opening profile again
    // console.log(user);
  };
  // Function to handle chat selection
  const handleSelectChat = (user, chat = null) => {
    setSelectedUser(user);
    setSelectedChat(chat); // If chat exists, set it
  };
  return (
    <>
      <div className="flex flex-row">
        <UserProfile onShowProfile={handleShowProfile} />
        {photoUpdated || !selectedUser ? (
          <UserChats onSelectChat={handleSelectChat} />
        ) : (
          <UserProfileSetting
            user={selectedUser}
            onPhotoUpdate={() => setPhotoUpdated(true)} // Callback to update UI
          />
        )}
        <div className="flex-1 bg-slate-500">
          <ChatBox user={selectedUser} chat={selectedChat} />
        </div>
        {/* <UserProfileSetting /> */}
      </div>
    </>
  );
};

export default ChatDashboard;
