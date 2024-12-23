import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/userSlice";
const store = configureStore({
  reducer: {
    userAuth: authReducer,
  },
});

export default store;
