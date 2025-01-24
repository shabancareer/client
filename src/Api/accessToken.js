import { jwtDecode } from "jwt-decode";
// import { useDispatch } from "react-redux";
// import { logout } from "../slices/userSlice";

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    // console.log("decoded=:", decoded);
    const currentTime = Math.floor(Date.now() / 1000);
    // const timeRemaining = decoded.exp - currentTime;
    const timeRemaining = (decoded.exp - currentTime) * 1000; // Remaining time in ms
    return timeRemaining;
  } catch (error) {
    console.error("Error decoding token:", error);
    return 0;
  }
};
export default isTokenExpired;
