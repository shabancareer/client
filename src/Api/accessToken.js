import { jwtDecode } from "jwt-decode";
const isTokenExpired = (token) => {
  console.log(token);
  try {
    const decoded = jwtDecode(token);
    console.log(decoded);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const timeRemaining = decoded.exp - currentTime; // Time left in seconds
    // return timeRemaining > 0 ? timeRemaining * 1000 : 0;
    // return decoded.exp < currentTime; // Check if the token is expired
    return timeRemaining > 0 ? timeRemaining * 1000 : 0; // Return in milliseconds
  } catch (error) {
    console.error("Error decoding token:", error);
    return 0; // Treat invalid token as expired
  }
};
export default isTokenExpired;
