import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Skeleton } from "@/components/ui/skeleton";
import ScrollableFeed from "react-scrollable-feed";
import { accessChat, userProfiles } from "../pages/hooks/queryClient";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
// import debounce from "lodash.debounce";
// import debounce from "debounce";

// const UsersList = () => {};

const UserChats = ({ onSelectChat }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const authUser = useSelector((state) => state.user);

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
    queryFn: () => userProfiles({ searchTerm: debouncedSearch }), // ✅ Correct parameter name
    enabled: !!debouncedSearch, // Prevent API call when input is empty
  });

  const handleChat = useMutation({
    mutationFn: (receiverId) => accessChat({ receiverId, authUser }),
    onSuccess: (data, user) => {
      onSelectChat(user, data.chat); // ✅ Pass user and chat to ChatDashboard
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
    <div className=" h-screen border-gray-400 rounded w-1/4 flex flex-col">
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
            {users &&
              users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-start p-1 mb-1 border-b bg-white hover:bg-slate-200 cursor-pointer"
                  onClick={() => handleChat.mutate(user)}
                >
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <p className="text-gray-700 font-extrabold text-xl mx-11">
                    {user.name}
                  </p>
                  {/* <button onClick={() => handleChat(user)}></button> */}
                </div>
              ))}
          </ScrollableFeed>
        </div>

        {/* <h1>Shaban</h1>
        <h1>Shaban</h1>
        <h1>Shaban</h1> */}
      </div>
    </div>
  );
};

export default UserChats;
