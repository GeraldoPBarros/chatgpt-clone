import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { GlobalResponsesType, InitiapStateProps } from "@/src/types/chat";


const REDUCER_NAME = "chat";

const initialState: InitiapStateProps = {
  prompt: "No prompt",
  globalResponses: null,
  indexOfChatExibition: 0,
};

const chatSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setPrompt: (state, action: PayloadAction<string>) => {
      state.prompt = action.payload;
    },
    setGlobalResponses: (state, action: PayloadAction<GlobalResponsesType>) => {
      state.globalResponses = action.payload;
    },
    setIndexOfChatExibition: (state, action: PayloadAction<number>) => {
      state.indexOfChatExibition = action.payload;
    },
  },
});

export const messagePrompt = (state: RootState) => state.chatSlice.prompt;

export const { setPrompt, setGlobalResponses } = chatSlice.actions;

export default chatSlice.reducer;
