import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../theme";
import AuthCheck from "./Api/authcheck.jsx";
// import AuthCallback from "./Api/authcheck";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./App.css";
// import LoginPage2 from "./pages/LoginPage";
import LoginPage from "./pages/auth";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // const responseMessage = (response) => {
  //   console.log(response);
  // };
  // const errorMessage = (error) => {
  //   console.log(error);
  // };
  return (
    <div>
      {/* <React.StrictMode> */}
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster position="top-right" className="mt-5 pos" />
          <Routes>
            {/* Other routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCheck />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
      {/* </React.StrictMode> */}
    </div>
  );
}

export default App;
