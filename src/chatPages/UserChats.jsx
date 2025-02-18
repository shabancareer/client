import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Skeleton } from "@/components/ui/skeleton";
import ScrollableFeed from "react-scrollable-feed";
import { findChat, userProfiles } from "../pages/hooks/queryClient";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
// import debounce from "lodash.debounce";
// import debounce from "debounce";
// const UsersList = () => {};

const UserChats = ({ onSelectChat }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const authUser = useSelector((state) => state.auth.user);
  const chats = useSelector((state) => state.chat.chats);
  // console.log(chats);
  useEffect(() => {
    // console.log("Chats in Redux:", chats);
  }, [chats]);
  // Debounce user input to prevent excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // Adjust delay (300ms) as needed
    return () => clearTimeout(handler);
  }, [search]);
  // Fetch users based on search
  const {
    data: users,
    isLoading,
    isError,
    // error,
  } = useQuery({
    queryKey: ["users", debouncedSearch],
    // queryFn: () => userProfiles({ email: debouncedSearch }),
    queryFn: () => userProfiles({ searchTerm: debouncedSearch }),
    enabled: !!debouncedSearch, // Prevent API call when input is empty
  });

  // const findChat = useMutation({
  //   mutationFn: (receiverId) => accessChat({ receiverId, authUser }),
  //   onSuccess: (data, user) => {
  //     console.log("Data=", data.newChat);
  //     console.log("Users=", user);
  //     onSelectChat(user, data.newChat);
  //   },
  //   onError: (error) => {
  //     console.error("Error creating chat:", error);
  //   },
  // });
  const findChats = useMutation({
    mutationFn: (receiverId) => findChat({ receiverId, authUser }),
    onSuccess: (user) => {
      // console.log("Data=", data.newChat);
      console.log("Users=", user);
      // onSelectChat(user, data.newChat);
    },
    onError: (error) => {
      console.error("Error creating chat:", error);
    },
  });
  // const handleChat = (user) => {
  //   console.log("Selected User:", user);
  //   // Dispatch action or navigate to chat screen
  // };
  return (
    <div className=" h-screen rounded w-1/4 flex flex-col border-solid border-gray-400 border-r-2">
      <div className="bg-white 0 text-lg font-bold">
        <h1 className="mx-4 py-2">All Chats</h1>
      </div>
      <Separator className="bg-slate-500" />
      <div>
        <div className="mt-4 mx-2">
          <Input
            className="pl-10 border-b-2 border-green-700 focus-visible:ring-0 focus-visible:outline-none"
            placeholder="Search Or Start New Chat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchOutlinedIcon className="relative bottom-8 left-1 rotate-90" />
        </div>
        {/* <h1>{search}</h1> */}
        <div className="mt-4 h-ful max-h-96">
          {isLoading && (
            // <div className="bg-gray-200 h-6 w-full animate-pulse">
            //   Loading...
            // </div>
            <div key="loading">
              <Skeleton className="bg-gray-200 h-6 w-full animate-pulse" />
              <Skeleton className="bg-gray-200 h-6 w-full animate-pulse mt-1" />
              <Skeleton className="bg-gray-200 h-6 w-full animate-pulse mt-1" />
              {/* <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-1/2" /> */}
            </div>
          )}
          {isError && (
            <p className="text-red-500 p-12">No User found with that query</p>
          )}
          <ScrollableFeed className="custom-scrollbar">
            {debouncedSearch ? (
              users &&
              users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-start p-1 mb-1 border-b bg-white hover:bg-slate-200 cursor-pointer"
                  onClick={() => findChats.mutate(user)}
                >
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <p className="text-gray-700 font-extrabold text-xl mx-11">
                    {user.name}
                  </p>
                </div>
              ))
            ) : chats.length === 0 ? (
              <p className="text-red-500">No chats available</p>
            ) : (
              <ul className="space-y-3">
                {chats.map((chat) => (
                  <li
                    key={chat.id}
                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:bg-slate-300 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={chat.receiver?.photo || "default-avatar.png"}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {chat.receiver?.name || "Unknown User"}
                        </h4>
                        <p className="text-gray-600 text-sm">{chat.message}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </ScrollableFeed>
        </div>

        {/* <div className="w-full max-w-2xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
          {chats.length === 0 ? (
            <p className="text-red-500">No chats available</p>
          ) : (
            <ul className="space-y-3">
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={chat.receiver?.photo || "default-avatar.png"} // Display user's avatar
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {chat.receiver?.name || "Unknown User"}
                      </h4>
                      <p className="text-gray-600 text-sm">{chat.message}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default UserChats;
