// import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess } from "../slices/userSlice";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
// import { GoogleLogin } from "@react-oauth/google";
// import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { toast } from "../components/ui/use-toast";

const Login = () => {
  const dispatch = useDispatch();
  const clientId =
    "973714267326-ur64lcfoj5g7st6lo39kgo1r952pl79i.apps.googleusercontent.com";
  const redirectUri = "http://localhost:5173/chatDashbord";
  // Parse JWT Helper
  // const parseJwt = (token) => {
  //   try {
  //     const base64Url = token.split(".")[1];
  //     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  //     const jsonPayload = decodeURIComponent(
  //       atob(base64)
  //         .split("")
  //         .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
  //         .join("")
  //     );
  //     return JSON.parse(jsonPayload);
  //   } catch (error) {
  //     console.error("Error parsing JWT token:", error);
  //     return null;
  //   }
  // };
  // Function to handle the redirect flow
  // const handleRedirect = async () => {
  //   const params = new URLSearchParams(window.location.search);
  //   const code = params.get("code");
  //   if (code) {
  //     console.log("Authorization Code:", code);
  //     try {
  //       // Exchange the authorization code for tokens
  //       const response = await fetch("https://oauth2.googleapis.com/token", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //         body: new URLSearchParams({
  //           code,
  //           client_id: clientId,
  //           client_secret: "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", // Replace with your client secret
  //           redirect_uri: redirectUri,
  //           grant_type: "authorization_code",
  //         }),
  //       });

  //       const data = await response.json();
  //       console.log("Token Exchange Response:", data);
  //       if (data.access_token) {
  //         const user = parseJwt(data.id_token); // Parse the ID token to get user info
  //         dispatch(loginSuccess({ user, token: data.access_token }));
  //       } else {
  //         console.error("Failed to exchange authorization code for tokens");
  //       }
  //     } catch (error) {
  //       console.error("Error during token exchange:", error);
  //     }
  //   }
  // };
  // Handle the redirect flow on component mount
  // useEffect(() => {
  //   handleRedirect();
  //   window.history.replaceState({}, document.title, window.location.pathname);
  // }, []);
  // Fallback Redirect Login Function
  // const handleGoogleLoginRedirect = () => {
  //   const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  //     redirectUri
  //   )}&response_type=code&scope=openid email profile`;
  //   window.location.href = googleAuthUrl;
  const handleLoginSuccess = async (tokenResponse) => {
    try {
      console.log("Token Response:=", tokenResponse);
      const { access_token } = tokenResponse;
      // Fetch user info from Google
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (!userInfoResponse.ok) {
        throw new Error("Failed to fetch user info");
      }
      const userInfo = await userInfoResponse.json();
      console.log("User Info:", userInfo);
      const { email, email_verified, name, picture, hd } = userInfo;
      // Verify email domain (optional)
      if (hd !== "loadstop.com") {
        // alert("Only emails from loadstop.com are allowed to log in.");
        toast({
          title: "Login Failed",
          description: "Only emails from loadstop.com are allowed to log in.",
          variant: "destructive",
        });
        return;
      }

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
      const backendResponse = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, picture }),
      });
      const backendResult = await backendResponse.json();

      if (backendResult.success) {
        alert(`Welcome back, ${backendResult.user.name}!`);
        // Redirect or store session/token as needed
      } else {
        alert(backendResult.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: () => console.log("Google Login Failed"),
  });
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
          <Link to="/" className="text-blue-600">
            Forget Password?
          </Link>
        </div>
        <div className="bg-blue-700 flex flex-row justify-evenly text-white py-2 hover:cursor-pointer">
          <button type="submit">Sing In</button>
        </div>
      </div>
      <div>
        <div className="flex flex-row pt-4">
          <h4 className="px-3">Not a Member?</h4>
          <Link className="text-blue-800" to="/">
            {" "}
            Sing Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
