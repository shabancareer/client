import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useMutation } from "react-query";
import { logoutSuccess } from "../slices/userSlice.js";
import { userLogout } from "../pages/hooks/queryClient.js";
// const userLogout = apiFunctions;
const UserProfile = ({ onShowProfile }) => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.auth.user);
  const [hovered, setHovered] = useState(false);
  const [fontSize, setFontSize] = useState("text-sm"); // Default font size
  const nameRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (nameRef.current) {
        const { scrollWidth, clientWidth } = nameRef.current;
        if (scrollWidth > clientWidth) {
          setFontSize("text-[8px]"); // Reduce font size if overflowing
        } else {
          setFontSize("text-xl");
        }
      }
    };
    checkOverflow(); // Run on mount
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [loginUser?.name]);

  const logout = useMutation({
    mutationFn: async (email) => {
      return await userLogout({ email });
    },
    onSuccess: () => {
      // localStorage.removeItem("accessToken");
      dispatch(logoutSuccess());
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
  return (
    <>
      <div className="flex flex-col relative pb-5 items-center justify-end h-screen border-r-2 border-white bg-yellow-300">
        <div className="absolute top-5 max-w-[150px] overflow-hidden">
          <h2 ref={nameRef} className={`font-bold truncate ${fontSize}`}>
            {loginUser.name?.charAt(0).toUpperCase() + loginUser.name?.slice(1)}
          </h2>
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
