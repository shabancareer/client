import { QueryClient } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { addChat } from "../../slices/chatSlice";

// import { useDispatch } from "react-redux";
// import { response } from "express";
// const dispatch = useDispatch();

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
export const loginUser = async ({ email, password }) => {
  const response = await axios.post(
    "http://localhost:3000/api/login",
    {
      email,
      password,
    },
    { withCredentials: true }
  );

  return response.data; // Assumes the API returns the token and user info
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
    // Filter users on the frontend as an extra check
    const filteredUsers = response.data
      .filter(
        (user) => user?.name?.toLowerCase().startsWith(searchTerm.toLowerCase()) // Optional chaining (?.) prevents errors
      )
      .map((user) => ({
        ...user,
        messages: user.chat?.messages || [], // add a `messages` array even if empty
      }));
    // console.log("filteredUsers===", filteredUsers);
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
export const createChat = async ({ authUser, receiverId }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.error("Error: No access token found.");
    throw new Error("No access token found.");
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/api/chats",
      // { authUser, receiverId },
      {
        senderId: authUser.id, // ✅ Ensure sender ID is sent
        receiverId: receiverId.id, // ✅ Ensure receiver ID is sent
        content: "New message t",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Chat created successfully:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server Error:", error.response.data);
    } else {
      console.error("Request Error:", error.message);
    }
    throw error; // Re-throw to handle in UI
  }
};
// export const findChat = async ({ authUser, receiverId }) => {
//   const token = localStorage.getItem("accessToken");

//   try {
//     const response = await axios.get("http://localhost:3000/api/allChats", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       params: {
//         senderId: authUser.id, // ✅ Correctly sending senderId
//         receiverId: receiverId.id, // ✅ Correctly sending receiverId
//         content: "New message t",
//       },
//     });

//     console.log("Chat Find successfully:", response);
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       console.error("Server Error:", error.response.data);
//     } else {
//       console.error("Request Error:", error.message);
//     }
//     throw error;
//   }
// };

export const fetchUserChats = async ({ user, dispatch }) => {
  if (!user || !user.id) {
    console.error("User object is missing or invalid:", user);
    return;
  }
  const token = localStorage.getItem("accessToken");
  // console.log("Fetching chats for user ID:", user.id);
  try {
    const response = await axios.get("http://localhost:3000/api/allChats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    // console.log("All chats with messages", response.data.chats);
    dispatch(addChat(response.data.chats));
    // console.log("Dispatching chats:", response.data.chats);
    // if (response.data.success) {
    //   // setChats(response.data.chats); // Update state with fetched chats
    // }
  } catch (error) {
    console.error("Error fetching user chats:", error);
    // toast({
    //   title: "Error!",
    //   description: "Failed to load chats.",
    //   variant: "destructive",
    // });
  }
};
export const getChatMessages = async ({ receiverId, authUser }) => {
  const token = localStorage.getItem("accessToken"); // Retrieve token
  if (!token) {
    console.error("No access token found!");
    return; // Prevent request if token is missing
  }
  try {
    const response = await axios.get("http://localhost:3000/api/messages", {
      params: { receiverId, authUser }, // ✅ Ensure query parameters are included
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Correctly formatted Authorization header
      },
      withCredentials: true, // ✅ Ensure credentials are sent if required
    });

    // console.log("Raw API Response:", response);
    return response.data; // ✅ Return response data
  } catch (error) {
    console.error("Error fetching user chats:", error.response?.data || error);
    throw error;
  }
};

// export default { useUpdateUserPhoto, userLogout };
