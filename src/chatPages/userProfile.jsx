import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useMutation } from "react-query";
import { logoutSuccess } from "../slices/userSlice.js";
import { userLogout } from "../pages/hooks/queryClient.js";
// const userLogout = apiFunctions;
const UserProfile = ({ onShowProfile }) => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.user);
  const [hovered, setHovered] = useState(false);
  // console.log(loginUser.email);

  const logout = useMutation({
    mutationFn: async (email) => {
      return await userLogout({ email });
    },
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      dispatch(logoutSuccess());
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
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
            src={loginUser.photo}
            alt={loginUser.name}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onShowProfile(loginUser)}
          />
          {hovered && (
            <div className="absolute bottom-14 text-center bg-white rounded shadow-lg">
              {loginUser.name}
            </div>
          )}
        </div>
        <LogoutOutlinedIcon
          className="mt-3 rounded-full border-2 hover:border-gray-300 hover:bg-gray-100 cursor-pointer transition-all"
          onClick={() => logout.mutate(loginUser.email)}
        />
      </div>
    </>
  );
};
export default UserProfile;
