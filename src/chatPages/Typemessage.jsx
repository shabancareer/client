import { useEffect } from "react";
import { useSelector } from "react-redux";

const TypeMessage = (selectedUser) => {
  const chats = useSelector((state) => state.chat.chats);
  const authUser = useSelector((state) => state.auth.user);
  // console.log("Auth User==", authUser);
  console.log("selectedUser==", selectedUser);
  // console.log("Chats from Redux state in type message component:", chats);
  // useEffect(() => {
  //   console.log("Chats from Redux state in type message component:", chats);
  // }, [chats]);
  return (
    <div>
      <input
        type="text"
        className="absolute top-[500px] left-[390px] w-[840px] bg-white h-10 pl-28 focus-visible:ring-0 focus-visible:outline-none border rounded-lg"
        placeholder="Type a message"
      />
    </div>
  );
};

export default TypeMessage;
