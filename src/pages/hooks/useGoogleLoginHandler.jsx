// import { useMutation } from "@tanstack/react-query";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "../../components/ui/use-toast";
import { loginSuccess } from "../../slices/userSlice";

const useGoogleLoginHandler = () => {
  // const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const loginWithBackend = useMutation({
    mutationFn: async (userInfo) => {
      const response = await fetch("http://localhost:3000/api/googleLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
        credentials: "include", // Ensures cookies are sent
      });
      // console.log(userInfo);
      if (!response.ok) {
        throw new Error("Failed to log in with backend");
      }
      return response.json();
    },
    onSuccess: (backendResult) => {
      if (!backendResult.success) {
        toast({
          title: "Login Failed!..",
          description: backendResult.error,
          variant: "destructive",
        });
        return;
      }
      // console.log(backendResult);
      dispatch(
        loginSuccess({
          token: backendResult.accessToken,
          user: backendResult.data,
        })
      );
      // Store the access token in localStorage
      localStorage.setItem("accessToken", backendResult.accessToken);
      toast({
        title: "Welcome!",
        description: `Hello, ${backendResult.data.name}. Login successful!`,
        variant: "success",
      });
      //   navigate(<ChatDashboard />);
    },
    onError: (error) => {
      toast({
        title: "Login Error",
        description: `"E-mail Cannot find user with these credentials. Please singUp first"${error.message}`,
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
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        return response.json();
      };

      const { access_token } = tokenResponse;
      const userInfo = await fetchUserInfo(access_token);

      const { email, email_verified, name, picture, sub } = userInfo;

      if (!email_verified) {
        toast({
          title: "Email Not Verified",
          description: "Please verify your email to log in.",
          variant: "destructive",
        });
        return;
      }

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
