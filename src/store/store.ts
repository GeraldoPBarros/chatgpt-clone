import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import chatReducer from "../features/chat/chat";


const middleware: any[] = [];

export const store = configureStore({
  reducer: {
    chatSlice: chatReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
