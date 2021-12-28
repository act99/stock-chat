import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChatState {
  chat: string;
}

const initialState: ChatState = {
  chat: "",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chatting: (state: any, action: any) => {
      state.chat = action.payload;
    },
  },
});

export const { chatting } = chatSlice.actions;

export default chatSlice.reducer;
