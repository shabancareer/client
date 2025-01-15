import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "../components/ui/use-toast";
// import { jwtDecode } from "jwt-decode";

// const isTokenValid = (token) => {
//   try {
//     const decoded = jwtDecode(token);
//     const currentTime = Math.floor(Date.now() / 1000);
//     return decoded.exp > currentTime; // Check if token is expired
//   } catch (error) {
//     console.error("Invalid token:", error);
//     return false;
//   }
// };
const AuthCheck = () => {
  const [loading, setLoading] = useState(true);
  // const [hasExecuted, setHasExecuted] = useState(false); // Guard for duplicate execution
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    // const token = searchParams.get("token");
    const newUser = searchParams.get("newUser") === "true";
    if (newUser) {
      toast({
        title: "User Register",
        description: "Welcome! Your account has been created successfully.",
        variant: "destructive",
      });
    }
    navigate("/");
    setLoading(false);
  }, [navigate]);

  return loading ? <div>Loading...</div> : null;
};

export default AuthCheck;
