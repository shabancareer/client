// import { useMutation } from "@tanstack/react-query";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "../../components/ui/use-toast";
import { loginSuccess } from "../../slices/userSlice";
import { fetchUserChats } from "./queryClient";
// import { error } from "console";

const useGoogleLoginHandler = () => {
  // const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const loginWithBackend = useMutation({
    mutationFn: async (userInfo) => {
      // console.log(userInfo);
      const response = await fetch("http://localhost:3000/api/googleLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
        credentials: "include", // Ensures cookies are sent
      });

      const responseData = await response.json();
      // ✅ Check for 404 (User Not Found)
      if (response.status === 403) {
        throw new Error(responseData.error); // This will be caught in onError
      }
      // ✅ Check for 403 (email not verified)
      if (response.status === 404) {
        throw new Error(responseData.error); // Will be caught in onError
      }
      // console.log(response);
      if (!response.ok) {
        throw new Error("Failed to logIn with backend");
      }
      // return;
      // return response.json();
      return responseData;
    },
    onSuccess: (backendResult) => {
      console.log("backendResult=", backendResult);
      // Handle email verification
      if (!backendResult.data.emailVerified) {
        toast({
          title: "Email Not Verified",
          description: "Please verify your email before logging in.",
          variant: "destructive",
        });
        return;
      }

      // Store token and user data
      const token = backendResult.accessToken;
      const user = backendResult.data;

      dispatch(loginSuccess({ token, user }));
      localStorage.setItem("accessToken", backendResult.accessToken);

      toast({
        title: "Welcome!",
        description: `Hello, ${backendResult.data.name}. Login successful!`,
        variant: "success",
      });

      fetchUserChats(user);
    },
    onError: (error) => {
      console.log("error.message=", error);
      // ✅ Show specific toast for "User Not Found" error
      if (
        error.message.includes(
          "E-mail Cannot find user with these credentials. Please singUp first"
        )
      ) {
        toast({
          title: "User Not Found",
          description: "Please sign up before logging in.",
          variant: "destructive",
        });
        return;
      }
      // ✅ Handle generic login errors
      toast({
        title: "Login Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const handleLoginSuccess = async (tokenResponse) => {
    try {
      const fetchUserInfo = async (accessToken) => {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // console.log("handleLoginSuccess=", response);
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        return response.json();
      };
      const { access_token } = tokenResponse;
      // console.log(access_token);
      const userInfo = await fetchUserInfo(access_token);
      // console.log("User Info from Google:", userInfo);
      const { email, name, picture, sub } = userInfo;
      // console.log(email_verified);
      // if (!email_verified) {
      //   toast({
      //     title: "Email Not Verified",
      //     description: "Please verify your email before login.",
      //     variant: "destructive",
      //   });
      //   return;
      // }

      loginWithBackend.mutate({ email, name, picture, sub });
    } catch (error) {
      console.error(error);
      toast({
        title: "Login Error",
        description: "An error occurred while logging in. Please try again.",
        variant: "destructive",
      });
    }
  };
  return handleLoginSuccess;
};

export default useGoogleLoginHandler;
