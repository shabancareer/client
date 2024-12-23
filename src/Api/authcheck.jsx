// import { useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { toast } from "../components/ui/use-toast";

// const AuthCheck = () => {
//   const [searchParams] = useSearchParams();

//   const navigate = useNavigate();
//   useEffect(() => {
//     const token = searchParams.get("token");
//     const newUser = searchParams.get("newUser") === "true";

//     if (token) {
//       try {
//         // Save token to localStorage
//         localStorage.setItem("accessToken", token);

//         // Show appropriate message
//         if (newUser) {
//           toast.success("Welcome! Your account has been created successfully.");
//         } else {
//           toast.info("Welcome back! You already have an account.");
//         }

//         // Redirect to the desired page (e.g., dashboard)
//         navigate("/");
//       } catch (error) {
//         console.error("Error handling token:", error);
//         toast.error("An error occurred. Please try again.");
//         navigate("/"); // Redirect to home or error page
//       }
//     }
//   }, [searchParams, navigate]);

//   return <div>Redirecting...</div>;
// };

// export default AuthCheck;

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "../components/ui/use-toast";
import { jwtDecode } from "jwt-decode";

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime; // Check if token is expired
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

const AuthCheck = () => {
  const [loading, setLoading] = useState(true);
  // const [hasExecuted, setHasExecuted] = useState(false); // Guard for duplicate execution
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const newUser = searchParams.get("newUser") === "true";
    if (token) {
      if (isTokenValid(token)) {
        localStorage.setItem("accessToken", token);
        toast({
          title: newUser ? "Signup Successful!" : "Email already Register",
          description: newUser
            ? "Welcome! Your account has been created successfully"
            : "You already have an account with this email",
          variant: newUser ? "success" : "destructive",
        });
      } else {
        toast({
          title: "Token error",
          description: "Invalid or expired token",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Token Not Found",
        description: "No token found. Please try logging in again",
        variant: "destructive",
      });
    }
    navigate("/");
    setLoading(false);
  }, [navigate]);

  return loading ? <div>Loading...</div> : null;
};

export default AuthCheck;
