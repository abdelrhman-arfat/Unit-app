import { languages } from "@/app/constants/Languages";
import { TLanguages } from "@/app/types/Languages";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TLanguages = "ar";

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang: (state, action) => {
      if (languages.includes(action.payload)) return action.payload;
    },
  },
});
export const { setLang } = langSlice.actions;
export default langSlice.reducer;
