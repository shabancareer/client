import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/userSlice";
import chatReducer from "./slices/chatSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer, // Now chat state is properly managed
});

const persistConfig = {
  key: "auth",
  storage,
  // whitelist: ["user", "token", "isAuthenticated"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
