import { useState } from "react";
import { useSelector } from "react-redux";

const UserProfile = ({ onShowProfile }) => {
  const loginUser = useSelector((state) => state.user);
  const [userProfile, setuserProfile] = useState(loginUser);
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <div className="flex flex-col relative pb-5 items-center justify-end h-screen border-r-2 border-white bg-yellow-300">
        <div className="absolute top-5">
          <h2>Shaban Ali</h2>
        </div>
        <div className="relative space-y-4 pl-3">
          <img
            className={`w-16 h-16 rounded-full  border-2 border-gray-300 shadow-md transition-transform ${
              hovered ? "scale-110 cursor-pointer" : "scale-100"
            }`}
            src={userProfile.photo}
            alt={userProfile.name}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onShowProfile(userProfile)}
          />
          {hovered && (
            <div className="absolute bottom-14 text-center bg-white rounded shadow-lg">
              {userProfile.name}
            </div>
          )}
        </div>
        {/* <button type="button">Profile</button> */}
      </div>
    </>
  );
};
export default UserProfile;
