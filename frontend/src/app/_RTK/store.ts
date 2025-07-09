import { configureStore } from "@reduxjs/toolkit";
import langSlice from "./redux-slices/LangSlice";
import userSlice from "./redux-slices/UserSlice";
import filteringSlice from "./redux-slices/FilteringSlice";
import { api } from "./RTK-query/RTKQuery";
const store = configureStore({
  reducer: {
    languages: langSlice,
    user: userSlice,
    filtering: filteringSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
