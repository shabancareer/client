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
  // console.log("Reponse Data:=", response.data);
  return response.data; // Assumes the API returns the token and user info
};

export const userProfiles = async ({ searchTerm }) => {
  const token = localStorage.getItem("accessToken");
  // Debugging: Check if searchTerm is undefined or empty
  // if (!searchTerm || typeof searchTerm !== "string") {
  //   console.error("❌ Search term is invalid:", searchTerm);
  //   return [];
  // }
  if (!searchTerm) return []; // Prevent unnecessary API calls
  try {
    const response = await axios.get("http://localhost:3000/api/allusers", {
      params: { search: searchTerm }, // Ensure the query parameter is correct
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Fetched Users:", response.data);
    // Filter users on the frontend as an extra check
    const filteredUsers = response.data.filter(
      (user) => user?.name?.toLowerCase().startsWith(searchTerm.toLowerCase()) // Optional chaining (?.) prevents errors
    );
    // console.log("filteredUsers=", filteredUsers);
    return filteredUsers;
    // return response.data;
  } catch (error) {
    console.error(
      "API Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// export default { useUpdateUserPhoto, userLogout };
