import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../theme";
import AuthCheck from "./Api/authcheck.jsx";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./App.css";
import UserAuth from "./pages/UserAuth.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ChatDashboard from "./chatPages/chatDashbord.jsx";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

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
