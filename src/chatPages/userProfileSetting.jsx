import React from "react";

// const UserProfileSetting = () => {
//   return <div>UserProfileSetting</div>;
// };
// export default UserProfileSetting;

const UserProfileSetting = ({ user, onClose }) => {
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">User Profile</h2>
      <img
        // src={user.photo}
        // alt={user.name}
        className="w-32 h-32 rounded-full object-cover mt-4"
      />
      {/* <p className="mt-2 text-lg font-medium">{user.name}</p> */}
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default UserProfileSetting;
