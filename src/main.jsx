// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import store from "./store";
import App from "./App.jsx";
// import ForgetPasswordPopup from "./pages/ForgetPasswordPopup.jsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="973714267326-ur64lcfoj5g7st6lo39kgo1r952pl79i.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </Provider>
);
