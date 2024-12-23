import { toast as shadcnToast } from "react-hot-toast"; // Adjust depending on your toast library.

export const toast = ({ title, description, variant }) => {
  shadcnToast(`${title}: ${description}`, {
    className:
      variant === "destructive"
        ? "bg-red-500 text-white"
        : "bg-green-500 text-white",
  });
};

// export const toast = ({ title, description, variant }) => {
//   const variantStyles = {
//     success: "bg-green-500 text-white",
//     destructive: "bg-red-500 text-white",
//     default: "bg-gray-800 text-white",
//   };

//   shadcnToast(
//     (t) => (
//       <div
//         className={`rounded-md px-4 py-3 shadow-md ${
//           variantStyles[variant] || variantStyles.default
//         }`}
//         onClick={() => shadcnToast.dismiss(t.id)}
//       >
//         <strong>{title}</strong>
//         <p>{description}</p>
//       </div>
//     ),
//     { duration: 4000 } // Customize toast duration
//   );
// };
