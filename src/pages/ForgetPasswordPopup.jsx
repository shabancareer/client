// import React from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "../components/ui/use-toast";
// import { toast } from "react-hot-toast";

const ForgetPasswordPopup = () => {
  const [email, setEmail] = useState("");
  // console.log("Email:=", email);
  const mutation = useMutation({
    mutationFn: () =>
      axios.post(
        "http://localhost:3000/api/forgotpass",
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      ),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Password reset email sent successfully.",
        variant: "success",
      });
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
    mutation.mutate(email);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "7px",
        margin: "10px",
      }}
    >
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          color: "#2d3748",
          marginBottom: "1rem",
        }}
      >
        {/* <Toaster /> */}
        Forget Password
      </h3>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid",
            borderRadius: "0.5rem",
            outline: "none",
            transition: "box-shadow 0.2s ease-in-out",
          }}
        />
        <button
          type="submit"
          disabled={mutation.isLoading}
          style={{
            backgroundColor: "#ebf8ff",
            color: "#3182ce",
            fontWeight: "400",
            paddingInline: "2.5rem",
            height: "2.5rem",
            borderRadius: "0.5rem",
            borderStyle: "solid",
            borderWidth: "0px",
            transition: "background-color 0.2s, color 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#bee3f8"; // Corresponds to hover:bg-blue-200
            e.target.style.color = "#6b7280"; // Corresponds to hover:text-gray-500
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#ebf8ff"; // Reset background to bg-blue-100
            e.target.style.color = "#3182ce"; // Reset color to text-blue-600
          }}
        >
          Click Here
          {mutation.isLoading ? "Sending..." : "Send Reset Email"}
        </button>
      </form>
    </div>
  );
};
export default ForgetPasswordPopup;
