import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const REDUCER_NAME = "chat";

const initialState = {
  prompt: "sdasdasdasdasd",
};

const chatSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setPrompt: (state, action: PayloadAction<string>) => {
      state.prompt = action.payload;
    },
  },
});

export const messagePrompt = (state: RootState) =>
  state.chatSlice.prompt;

export const { setPrompt } = chatSlice.actions;

export default chatSlice.reducer;
