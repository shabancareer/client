// import React from "react";
import { useState } from "react";
import { toast } from "../components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const ForgetPasswordPopup = () => {
  const [email, setEmail] = useState("");
  // React Query mutation for forget password
  //   const mutation = useMutation(
  //     mutationFn: (email) => {
  //       return axios.post("http://localhost:3000/api/forgotpass", email,{
  //           headers: { "Content-Type": "multipart/form-data" },
  //       });
  //     },
  //     {
  //       onSuccess: () => {
  //         toast({
  //           title: "Success",
  //           description: "Password reset email sent successfully!",
  //           variant: "success",
  //         });
  //         setEmail("");
  //       },
  //       onError: (error) => {
  //         toast({
  //           title: "Error",
  //           description: error.message || "Failed to send reset password email.",
  //           variant: "destructive",
  //         });
  //       },
  //     }
  //   );
  const mutation = useMutation({
    mutationFn: (email) => {
      return axios.post("http://localhost:3000/api/forgotpass", email, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Password reset email sent successfully!",
        variant: "success",
      });
      setEmail(""); // Clear the email field
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset password email.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    // sendForgetPasswordRequest();
    mutation.mutate();
  };

  return (
    <div style={{ width: "100%", padding: "20px", textAlign: "center" }}>
      <h3>Forget Password</h3>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          //   className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          //   className="bg-blue-700 flex flex-row justify-evenly text-white py-2 cursor: ${isLoading ? 'not-allowed' : 'pointer"
          disabled={mutation.isLoading}
        >
          Click Here
          {mutation.isLoading ? "Sending..." : "Send Reset Email"}
        </button>
      </form>
    </div>
  );
};
export default ForgetPasswordPopup;
