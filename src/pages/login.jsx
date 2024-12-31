// import React from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import { loginSuccess } from "../slices/userSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import ForgetPasswordPopup from "./ForgetPasswordPopup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const Login = () => {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const clientId =
    "973714267326-ur64lcfoj5g7st6lo39kgo1r952pl79i.apps.googleusercontent.com";
  const redirectUri = "http://localhost:5173/chatDashbord";
  const queryClient = new QueryClient();
  const handleLoginSuccess = async (tokenResponse) => {
    try {
      // console.log("Token Response:=", tokenResponse);
      const { access_token } = tokenResponse;
      // console.log(access_token);
      // Fetch user info from Google
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      // console.log(userInfoResponse);
      if (!userInfoResponse.ok) {
        throw new Error("Failed to fetch user info");
      }
      const userInfo = await userInfoResponse.json();
      const { email, email_verified, name, picture, sub } = userInfo;

      // Check if email is verified
      if (!email_verified) {
        alert("Email not verified. Please verify your email to log in.");
        toast({
          title: "Email not Failed",
          description:
            "Email not verified. Please verify your email to log in.",
          variant: "destructive",
        });
        return;
      }
      // Send user info to backend for validation
      const backendResponse = await fetch(
        "http://localhost:3000/api/googleLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name, picture, sub }),
        }
      );
      const backendResult = await backendResponse.json();
      if (!backendResult.success) {
        toast({
          title: "Login Failed!..",
          description: backendResult.error,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Welcome!",
        description: `Hello, ${backendResult.data.name}. Login successful!`,
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Login Error",
        description: "An error occurred while logging in. Please try again.",
        variant: "destructive",
      });
    }
  };
  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    // onError: () => console.log("Google Login Failed"),
  });

  const handleOpenPopup = () => {
    // Open a new popup window
    const popupWindow = window.open(
      "exapmle.com", // URL of the popup
      "_blank", // Target (opens in a new tab or window)
      "width=600,height=400,scrollbars=yes,resizable=yes" // Popup window settings
    );

    if (popupWindow) {
      popupWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Forget Password</title>
        </head>
        <body>
          <div id="popup-root"></div>
        </body>
      </html>
    `);
      popupWindow.document.close();
      // Render the React component in the popup
      const popupRoot = popupWindow.document.getElementById("popup-root");
      if (popupRoot) {
        // setShowPopup(true);
        const root = ReactDOM.createRoot(popupRoot);
        root.render(
          <QueryClientProvider client={queryClient}>
            <Toaster position="top-right" reverseOrder={false} />
            <ForgetPasswordPopup
              onClose={() => {
                root.unmount(); // Clean up the React component
                popupWindow.close(); // Close the popup window
              }}
            />
          </QueryClientProvider>
        );
      } else {
        alert("Popup blocked! Please allow popups for this website.");
      }
    }
  };
  return (
    <>
      <div className="flex flex-col space-y-4 w-5/12">
        {/* <GoogleOAuthProvider clientId="973714267326-ur64lcfoj5g7st6lo39kgo1r952pl79i.apps.googleusercontent.com"> */}
        <div className="flex justify-center my-10">
          <h3 className="text-gray-700">Sign in with:</h3>
          {/* <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            // useOneTap
            // flow="auth-code"
          /> */}
          <button type="submit" className="absolute p-3">
            <img
              src="../../public/assets/images/google.svg"
              className="w-6 h-6 m-5 mx-4 hover:cursor-pointer"
              alt="Google Login button"
              onClick={loginWithGoogle}
            />
          </button>
        </div>
        {/* </GoogleOAuthProvider> */}
        <p className="flex flex-row justify-center">Or:</p>
        <input
          type="email"
          placeholder="Enter your Email"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Enter your Password"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-row justify-end mt-7">
          <button className="text-blue-600" onClick={handleOpenPopup}>
            Forget Password?
          </button>
          {/* {showPopup && <div id="popup-root"></div>} */}
        </div>
        <div className="bg-blue-700 flex flex-row justify-evenly text-white py-2 hover:cursor-pointer">
          <button type="submit">Sing In</button>
        </div>
      </div>
      <div>
        <div className="flex flex-row pt-4">
          <h4 className="px-3">Not a Member?</h4>
          <button className="text-blue-800"> Sing Up</button>
        </div>
      </div>
    </>
  );
};

export default Login;
