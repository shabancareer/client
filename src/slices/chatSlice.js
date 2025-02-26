import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  selectChat: null,
};
const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {
    addChat: (state, action) => {
      // console.log("Previous state:", state.chats); // Log before update
      state.chats = action.payload; // Updating Redux state
      // console.log("Updated state:", state.chats); // Log after update
    },
    resetChat: () => initialState,
  },
});
export const { addChat, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
