import { configureStore } from "@reduxjs/toolkit";
import langSlice from "./redux-slices/LangSlice";
import userSlice from "./redux-slices/UserSlice";
const store = configureStore({
  reducer: {
    languages: langSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
