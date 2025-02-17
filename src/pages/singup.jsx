// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
import { useMutation } from "react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import googleImg from "../../public/assets/images/google.svg";
import { toast } from "../components/ui/use-toast";

const SingUp = () => {
  const navigate = useNavigate();
  // Extract token from URL
  const queryParams = new URLSearchParams(window.location.search);
  console.log(queryParams);
  const token = queryParams.get("token");
  console.log("token singup=", token);
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const { email } = decodedToken;
      console.log("User Email:", email);
      // Store token securely
      localStorage.setItem("accessToken", token);
      // You can optionally trigger a redirect here if needed:
      // window.location.href = "/";
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }
  // Perform navigation within `useEffect` to avoid React warnings
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn: (formData) => {
      // Send the FormData as the POST body, with appropriate headers
      // console.log(formData);
      return axios.post("http://localhost:3000/api/singUp", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: (data) => {
      // console.log("User created:", data.data);
      const userEmail = data.data.data.email;
      toast({
        title: "Signup Successful!",
        description: `Your account has been created successfully.${userEmail}Please check your inbox to verify email`,
        variant: "success",
      });
    },
    onError: (error) => {
      // console.error("Signup failed:", error.response?.data || error.message);
      toast({
        title: "Signup Failed",
        description:
          error.response?.data?.message ||
          "An error occurred. Please try again",
        variant: "destructive",
      });
    },
  });
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    // Call handleFileUpload if there's a file
    if (data.file && data.file[0]) {
      formData.append("file", data.file[0]); // Ensure the field name matches the backend
    }
    mutation.mutate(formData);
    // Optionally reset the form
    reset();
  };
  return (
    <>
      <div className="flex justify-center my-10">
        <h3 className="text-gray-700">Sign Up with:</h3>
        <a href="http://localhost:3000/auth/google" className="absolute p-3">
          <img
            src={googleImg}
            className="w-6 h-6 m-5 mx-4 hover:cursor-pointer"
            alt="Google SingUp button"
          />
        </a>
      </div>

      <p className="flex flex-row justify-center mb-2">Or:</p>
      <form
        className="flex flex-col space-y-4 w-5/12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Enter your Name"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="name"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <input
          type="file"
          name="file"
          placeholder="Upload your Profile Photo"
          className="px-4 py-2 border-4 border-dotted border-blue-400 rounded-lg hover:border-blue-600"
          {...register("file", { required: "Profile photo is required" })}
          // onChange={(event) => handleFileUpload(event.target.files[0])}
        />
        {errors.file && <p className="text-red-500">{errors.file.message}</p>}

        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          autoComplete="current-password"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <div className="bg-blue-700 flex flex-row justify-evenly text-white py-2 hover:cursor-pointer">
          <button type="submit">
            {mutation.isLoading ? "Creating..." : ""}
            Sing-Up
          </button>
        </div>
      </form>
      <div>
        <div className="flex flex-row pt-4">
          <button className="text-blue-800"> Already have a account?</button>
        </div>
      </div>
    </>
  );
};

export default SingUp;
