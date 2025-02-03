import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { userProfiles } from "../pages/hooks/queryClient";

const UserChats = () => {
  const [search, setSearch] = useState("");
  // console.log("Search from input=", search);
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
        <h1>{search}</h1>
        <h1>Shaban</h1>
        <h1>Shaban</h1>
        <h1>Shaban</h1>
      </div>
    </div>
  );
};

export default UserChats;
