import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    message: [],
  },
  reducers: {
    setMessage: (state, action) => {
      if (state.message.length > 40) {
        state.message.shift();
      }
      state.message.push(action.payload);
    },
  },
});
export const { setMessage } = chatSlice.actions;
export default chatSlice.reducer;
