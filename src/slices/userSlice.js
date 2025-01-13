import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  // email: null,
  token: null,
  chats: [],
  selectChat: null,
  isAuthenticated: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMood: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      // state.email = email;
      state.token = token;
      state.isAuthenticated = true;
      console.log("Action:=", action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});
export const { loginSuccess, logout, setMood } = authSlice.actions;
export default authSlice.reducer;
