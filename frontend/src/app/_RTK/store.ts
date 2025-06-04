import { configureStore } from "@reduxjs/toolkit";
import langSlice from "./redux-slices/LangSlice";

const store = configureStore({
  reducer: {
    languages: langSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
