import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../theme";
import AuthCheck from "./Api/authcheck.jsx";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import axios from "axios";
// import apiClient from "./Api/apiClient.js"; // Axios instance with credentials enabled
// import { toast } from "../components/ui/use-toast";
// import { toast } from "./components/ui/use-toast.jsx";
import "./App.css";
import UserAuth from "./pages/UserAuth.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ChatDashboard from "./chatPages/chatDashbord.jsx";
import isTokenExpired from "./Api/accessToken.js";
import { loginSuccess, logoutSuccess } from "./slices/userSlice.js";

function App() {
  // const isAuth = Boolean(useSelector((state) => state.token));
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = useSelector((state) => state.token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuth) return;
    const handleTokenRefresh = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/reauth",
          //
          {},
          {
            headers: {
              Authorization: `Bearer ${isAuth}`,
            },
            withCredentials: true,
          }
        );
        console.log("Re-auth Res:=", response.data);
        const { accessToken } = response.data;
        dispatch(
          loginSuccess({
            token: accessToken,
          })
        );
      } catch (error) {
        console.error("Failed to refresh token. Logging out.", error);
        dispatch(logoutSuccess());
      }
    };
    const remainingTime = isTokenExpired(isAuth);
    // console.log(remainingTime);
    if (remainingTime > 0) {
      // console.log(`Token will expire in ${remainingTime / 1000} seconds`);
      setTimeout(() => {
        handleTokenRefresh();
      }, remainingTime);
    } else {
      console.log(
        "Token is already expired. User will be logged out immediately."
      );
      dispatch(logoutSuccess());
    }

    // if (remainingTime <= 0) {
    //   setTimeout(() => {
    //     console.log("Token has expired.");
    //     dispatch(logout());
    //   }, remainingTime);
    // }
    // Set a timer to remove the token upon expiration

    // console.log(remainingTime);
    // console.log(interval);
    // console.log("sddsd", interval);

    // if (remainingTime <= 0) {
    //   // dispatch(logout());
    //   // Set a timeout to logout the user when the token expires
    //   // const refreshTimer = setTimeout(() => {
    //   //   // handleTokenRefresh();
    //   //   // console.log("Token expired. User logged out automatically.");
    //   // }, remainingTime - 30000);
    //   // Clear the timeout if the token changes (e.g., user logs in with a new token)
    //   return () => clearTimeout(refreshTimer);
    // } else {
    //   // Token already expired, try refreshing immediately
    //   // handleTokenRefresh().catch(() => dispatch(logout()));
    // }
  }, [isAuth, dispatch]);

  return (
    <div>
      {/* <React.StrictMode> */}
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster position="top-right" className="mt-5 pos" />
          <Routes>
            {/* Other routes */}
            <Route
              path="/"
              element={isAuth ? <ChatDashboard /> : <UserAuth />}
            />
            <Route path="/auth/callback" element={<AuthCheck />} />
            <Route path="/resetpass/:resetToken" element={<ResetPassword />} />
            {/* <Route path="/ChatDashboard" element={<ChatDashboard />} /> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
      {/* </React.StrictMode> */}
    </div>
  );
}

export default App;
