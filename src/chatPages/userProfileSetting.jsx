import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Separator } from "@/components/ui/separator";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { useUpdateUserPhoto } from "../pages/hooks/queryClient.js";
import { updatePhoto } from "../slices/userSlice.js";
// const loginUser = useSelector((state) => state.user);

// import { updatePhoto } from "../../../chatapp-node/controllers/userController.js";
// const UserProfileSetting = () => {
//   return <div>UserProfileSetting</div>;
// };
// export default UserProfileSetting;

const UserProfileSetting = ({ user, onPhotoUpdate }) => {
  const fileInputRef = useRef(null);
  const updateUserPhoto = useUpdateUserPhoto();
  // const [photo, setPhoto] = useState(user.photo);
  const dispatch = useDispatch();
  const photo = useSelector((state) => state.auth.photo);
  // console.log(photo);
  const handlePhotoChange = async (event) => {
    // console.log("button clicked", handlePhotoChange);
    const file = event.target.files[0];
    if (file) {
      updateUserPhoto.mutate(
        { userId: user.id, file: file },
        {
          onSuccess: (data) => {
            const newPhotoUrl = data.data.photo;
            // setPhoto(newPhotoUrl); // Update local state
            dispatch(updatePhoto(newPhotoUrl));
            onPhotoUpdate();
          },
        }
      );
    }
  };
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">{user.name}</h2>
      <Separator />
      <div className="relative mt-4 w-32 h-32 rounded-full border group">
        <img
          className="w-full h-full rounded-full object-cover"
          // src={user?.photo}
          src={`${photo}?t=${new Date().getTime()}`}
          alt={user.name}
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => fileInputRef.current.click()}
        >
          <div className="text-white flex flex-col items-center mx-3 ">
            <AddAPhotoOutlinedIcon className="w-8 h-8 mb-1" />
            <span className="text-sm">Change Profile Photo</span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
      </div>

      {/* <p className="mt-2 text-lg font-medium">{user.name}</p> */}
      {/* <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={onClose}
      >
        Close
      </button> */}
    </div>
  );
};

export default UserProfileSetting;
