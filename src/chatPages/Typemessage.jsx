import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TypeMessage = ({ user: chatData }) => {
  const [typeMessage, setTypeMessage] = useState("");
  console.log("userchat==", chatData);
  useEffect(() => {
    //   console.log("user==", chatData);
  }, []);
  useEffect(() => {
    console.log("typeMessage==", typeMessage); // Logs when typeMessage changes
  }, [typeMessage]);

  return (
    <div>
      <input
        type="text"
        className="absolute top-[500px] left-[390px] w-[840px] bg-white h-10 pl-28 focus-visible:ring-0 focus-visible:outline-none border rounded-lg"
        placeholder="Type a message"
        value={typeMessage}
        onChange={(e) => setTypeMessage(e.target.value)}
      />
    </div>
  );
};

export default TypeMessage;
