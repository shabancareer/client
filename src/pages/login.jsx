import ReactDOM from "react-dom/client";
import { useGoogleLogin } from "@react-oauth/google";
import ForgetPasswordPopup from "./ForgetPasswordPopup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import useGoogleLoginHandler from "./hooks/useGoogleLoginHandler";

const Login = () => {
  const queryClient = new QueryClient();
  const handleLoginSuccess = useGoogleLoginHandler();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleLoginSuccess,
  });

  const handleOpenPopup = () => {
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
        <div className="flex justify-center my-10">
          <h3 className="text-gray-700">Sign in with:</h3>
          <button type="submit" className="absolute p-3">
            <img
              src="../../public/assets/images/google.svg"
              className="w-6 h-6 m-5 mx-4 hover:cursor-pointer"
              alt="Google Login button"
              onClick={loginWithGoogle}
            />
          </button>
        </div>
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
