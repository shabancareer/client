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

// / Custom hook for updating user photo
const useUpdateUserPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ userId, file, token }) => {
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
            Authorization: `Bearer ${token}`, // Add the token here
          },
        }
      );
      // console.log(data);
      return data;
    },
    {
      onSuccess: (data) => {
        // Invalidate the 'user' query to refetch updated data
        queryClient.invalidateQueries("user");
        console.log("Photo updated:", data.photo);
      },
      onError: (error) => {
        console.error("Error updating photo:", error.message);
      },
    }
  );
};

export default useUpdateUserPhoto;
