import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../theme";
import AuthCheck from "./Api/authcheck.jsx";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
// import { toast } from "../components/ui/use-toast";
import { toast } from "./components/ui/use-toast.jsx";

import "./App.css";
import UserAuth from "./pages/UserAuth.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ChatDashboard from "./chatPages/chatDashbord.jsx";
import isTokenExpired from "./Api/accessToken.js";
import { logout } from "./slices/userSlice.js";

function App() {
  // const isAuth = Boolean(useSelector((state) => state.token));
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth) return;
    const remainingTime = isTokenExpired(isAuth);

    if (remainingTime > 0) {
      // Set a timeout to logout the user when the token expires
      const logoutTimer = setTimeout(() => {
        dispatch(logout());
        console.log("Token expired. User logged out automatically.");
      }, remainingTime);

      // Clear the timeout if the token changes (e.g., user logs in with a new token)
      return () => clearTimeout(logoutTimer);
    } else {
      // If token is already expired, log the user out immediately
      dispatch(logout());
    }
    if (remainingTime > 5000) {
      // Notify 5 seconds before logout
      setTimeout(() => {
        toast({
          title: "Login out",
          description:
            "Your session is about to expire. Please save your work.",
          variant: "destructive",
        });
        // alert("Your session is about to expire. Please save your work.");
      }, remainingTime - 5000);
    }
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
