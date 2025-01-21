// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryDevtools } from "react-query/devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store.js";
import App from "./App.jsx";
import "./index.css";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import ForgetPasswordPopup from "./pages/ForgetPasswordPopup.jsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="973714267326-ur64lcfoj5g7st6lo39kgo1r952pl79i.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
