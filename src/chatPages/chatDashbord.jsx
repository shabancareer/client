import { useState } from "react";
import UserProfile from "./userProfile";
import UserProfileSetting from "./userProfileSetting";
import ChatBox from "./ChatBox";
import UserChats from "./UserChats";
// import { useSelector } from "react-redux";
const ChatDashboard = () => {
  // const userChats = useSelector((state) => state.chats);
  // const [selectedChat, setSelectedChat] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchedUser, setSearchedUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [photoUpdated, setPhotoUpdated] = useState(false); // Track photo update

  const handleShowProfile = (user) => {
    setSelectedUser(user); // Set the selected user data when clicked
    setPhotoUpdated(false); // Reset state when opening profile again
    // console.log(user);
  };
  // Function to handle chat selection
  const handleSelectChat = (user) => {
    // console.log("Selected Chat:", user); // Debugging
    // const messageContents = user.messages.map((msg) => msg.content);
    // const firstMessageContent = messageContents[0];

    // setSelectedUser(user);
    setSearchedUser(user);
    // setSelectedChat(firstMessageContent); // If chat exists, set it
  };
  const userChat = (chat) => {
    // console.log("Chat clicked:", chat); // Debugging
    setCurrentChat(chat); // Update currentChat state
  };
  return (
    <>
      <div className="flex flex-row">
        <UserProfile onShowProfile={handleShowProfile} />
        {photoUpdated || !selectedUser ? (
          <UserChats onSelectChat={handleSelectChat} userChat={currentChat} />
        ) : (
          <UserProfileSetting
            user={selectedUser}
            onPhotoUpdate={() => setPhotoUpdated(true)} // Callback to update UI
          />
        )}
        {/* <UserProfileSetting /> */}
        <div className="flex-1">
          <ChatBox user={searchedUser} userChat={currentChat} />
          {/* <p>chat={selectedChat}</p> */}
          {/* {console.log("selectedChat", selectedChat.content)} */}
          {/* {selectedChat.content} */}
          <div>{/* <p>selectedChat</p> */}</div>
        </div>
      </div>
    </>
  );
};

export default ChatDashboard;
