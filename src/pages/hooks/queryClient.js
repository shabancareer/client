import { QueryClient } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Number of retries before failing
      refetchOnWindowFocus: false, // Avoid unnecessary refetches
    },
  },
});
// Custom hook for updating user photo
export const useUpdateUserPhoto = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ userId, file }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);
      // console.log("Token being sent:", token); // Debugging: Check token before sending
      const { data } = await axios.post(
        "http://localhost:3000/api/update-photo",
        formData,
        {
          // headers: { "Content-Type": "multipart/form-data" },
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`, // Add the token here
          },
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        console.log("Photo updated:", data.data.photo);
        // Update local cache
        queryClient.setQueryData(["user", data.data.userId], (oldData) => ({
          ...oldData,
          photo: data.data.photo,
        }));
        queryClient.invalidateQueries(["user", data.data.userId]); // Refetch data
      },
      onError: (error) => {
        console.error("Error updating photo:", error.message);
      },
    }
  );
};
export const userLogout = async ({ email }) => {
  const token = localStorage.getItem("accessToken"); // Retrieve stored token
  // console.log(token);
  const response = await axios.post(
    "http://localhost:3000/api/logout",
    {
      email,
    },
    {
      withCredentials: true,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Add the token here
      },
    }
  );
  console.log("Reponse Data:=", response.data);
  return response.data; // Assumes the API returns the token and user info
};

export const userProfiles = async ({ email }) => {
  // console.log("All users");
  const allUsers = await axios.get(
    "http://localhost:3000/api/allusers",
    {
      email,
    },
    {
      withCredentials: true,
      headers: {
        // "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${token}`, // Add the token here
      },
    }
  );
  console.log("Users Data:=", allUsers);
};
// export default { useUpdateUserPhoto, userLogout };
