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
      // console.log("Action:=", action.payload.token);
    },
    updatePhoto: (state, action) => {
      // console.log(action.payload);
      state.user.photo = action.payload; // Only update photo
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
    },
  },
});
export const { loginSuccess, logout, setMood, updatePhoto } = authSlice.actions;
export default authSlice.reducer;
