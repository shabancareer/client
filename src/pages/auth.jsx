import { useState, useEffect } from "react";
// import { loginSuccess } from "../slices/userSlice";
// import { Link } from "react-router";
import Singup from "./singup";
import Login from "./login";
import { useSearchParams } from "react-router-dom";
import { toast } from "../components/ui/use-toast";

const Userauth = () => {
  const [searchParams] = useSearchParams();
  const [justifyActive, setJustifyActive] = useState("Table1");

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
            onClick={() =>
              setJustifyActive("Table1")`${justifyActive === "Table1"}`
            }
            className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-gray-500 font-normal px-10 h-10 rounded-lg border-solid border-0"
          >
            Login
          </button>
          <div>
            <button
              onClick={() =>
                setJustifyActive("Table2")`${justifyActive === "Table2"}`
              }
              className="bg-red-100 text-gray-500 hover:bg-red-200 hover:text-gray-600 font-normal px-10 h-10 rounded-lg border-solid border-0"
              type="button"
            >
              Register
            </button>
          </div>
        </div>
        {justifyActive === "Table1" ? <Login /> : <Singup />}
      </div>
    </>
  );
};

export default Userauth;
