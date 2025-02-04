import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { userProfiles } from "../pages/hooks/queryClient";
import { useQueries, useQuery } from "react-query";
// import debounce from "lodash.debounce";
import debounce from "debounce";

// const UsersList = () => {};

const UserChats = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
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
    error,
  } = useQuery({
    queryKey: ["users", debouncedSearch],
    queryFn: () => userProfiles({ email: debouncedSearch }),
    enabled: !!debouncedSearch, // Prevent API call when input is empty
  });
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
        <div className="mt-4">
          {isLoading && <p>Loading...</p>}
          {isError && <p className="text-red-500">Error: {error.message}</p>}
          {users && users.map((user) => <h1 key={user.id}>{user.name}</h1>)}
        </div>
        {/* <h1>Shaban</h1>
        <h1>Shaban</h1>
        <h1>Shaban</h1> */}
      </div>
    </div>
  );
};

export default UserChats;
