import { useState, useEffect } from "react";
// import { loginSuccess } from "../slices/userSlice";
// import { Link } from "react-router";
import SingUp from "./singUp";
import Login from "./login";
import { useSearchParams } from "react-router-dom";
import { toast } from "../components/ui/use-toast";
// import { useQueryClient } from "@tanstack/react-query";

const UserAuth = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("Table1");
  // const queryClient = useQueryClient();
  // console.log("QueryClient inside UserAuth:", queryClient);

  useEffect(() => {
    const emailVerified = searchParams.get("emailVerified");
    if (emailVerified === "true") {
      // Show toast notification
      toast({
        title: "Success!",
        description: "Your email has been verified successfully.",
        duration: 5000,
        type: "success", // Adjust the type based on your ShadCN toast setup
      });
    }
  }, [searchParams]);
  return (
    <>
      <div className="border-solid border border-gray-300 flex items-center flex-col py-6 mt-10 mx-52">
        <div className="flex flex-row w-3/4 justify-evenly">
          <button
            onClick={() => setActiveTab("Table1")}
            // className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-gray-500 font-normal px-10 h-10 rounded-lg border-solid border-0"
            className={`bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-gray-500 font-normal px-10 h-10 rounded-lg border-solid border-0 ${
              activeTab === "Table1" ? "active-class" : ""
            }`}
          >
            Login
          </button>
          <div>
            <button
              onClick={() => setActiveTab("Table2")}
              className={`bg-red-100 text-gray-500 hover:bg-red-200 hover:text-gray-600 font-normal px-10 h-10 rounded-lg border-solid border-0 ${
                activeTab === "Table2" ? "active-class" : ""
              }`}
            >
              Register
            </button>
          </div>
        </div>
        {activeTab === "Table1" ? <Login /> : <SingUp />}
      </div>
    </>
  );
};

export default UserAuth;
