import { useState } from "react";
import UserProfile from "./userProfile";
import UserProfileSetting from "./userProfileSetting";
import ChatBox from "./ChatBox";
import UserChats from "./UserChats";
import TypeMessage from "./Typemessage";

// import { useSelector } from "react-redux";
const ChatDashboard = () => {
  // const userChats = useSelector((state) => state.chats);
  // const [selectedChat, setSelectedChat] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchedUser, setSearchedUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [photoUpdated, setPhotoUpdated] = useState(false); // Track photo update
  // console.log(searchedUser);
  const handleShowProfile = (user) => {
    setSelectedUser(user); // Set the selected user data when clicked
    setPhotoUpdated(false); // Reset state when opening profile again
    // console.log(user);
  };
  // Function to handle chat selection
  const handleSelectChat = (user) => {
    // console.log(user);
    setSearchedUser(user);
  };

  return (
    <>
      <div className="flex flex-row relative h-100 bg-slate-100">
        <UserProfile onShowProfile={handleShowProfile} />
        {photoUpdated || !selectedUser ? (
          <UserChats onSelectChat={handleSelectChat} />
        ) : (
          <UserProfileSetting
            user={selectedUser}
            onPhotoUpdate={() => setPhotoUpdated(true)} // Callback to update UI
          />
        )}
        {/* <UserProfileSetting /> */}
        <div className="flex-1">
          <ChatBox user={searchedUser} />
        </div>
      </div>
      <div>
        <TypeMessage user={searchedUser} />
      </div>
    </>
  );
};

export default ChatDashboard;
