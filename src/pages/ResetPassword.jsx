import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { response } from "express";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  console.log(resetToken);
  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/resetpass/${resetToken}`,
        { password }
      );
      console.log(response);
      alert("Password reset successfully!");
    } catch (error) {
      console.error(error);
      alert("Error resetting password");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        margin: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          color: "#2d3748",
          marginBottom: "1rem",
        }}
      >
        Reset Password
      </h1>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid",
            borderRadius: "0.5rem",
            outline: "none",
            transition: "box-shadow 0.2s ease-in-out",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid",
            borderRadius: "0.5rem",
            outline: "none",
            transition: "box-shadow 0.2s ease-in-out",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px",
          }}
        />
        <button
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
          type="submit"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
