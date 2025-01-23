import { jwtDecode } from "jwt-decode";
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const timeRemaining = decoded.exp - currentTime;
    // Ensure the function accounts for the 24-hour policy
    // const twentyFourHoursInSeconds = 24 * 60 * 60; // 86400 seconds
    // const isValid =
    // timeRemaining > 0 && timeRemaining <= twentyFourHoursInSeconds;
    // return isValid ? timeRemaining * 1000 : 0; // Convert to milliseconds
    return timeRemaining > 0 ? timeRemaining * 1000 : 0;
  } catch (error) {
    console.error("Error decoding token:", error);
    return 0;
  }
};
export default isTokenExpired;
