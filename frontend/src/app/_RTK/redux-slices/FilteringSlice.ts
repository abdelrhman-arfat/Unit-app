import { grades } from "@/app/types/grades";
import { specializations } from "@/app/types/Specialization";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  subjectId?: number;
  grade?: grades;
  specialization?: specializations;
} = {};

const filteringSlice = createSlice({
  name: "filtering",
  initialState,
  reducers: {
    setFilter(state, action) {
      state = {
        ...state,
        ...action.payload,
      };
      return state
    },
    clearFilter(state) {
      state = {};
      return state;
    },
  },

});
export const { setFilter , clearFilter } = filteringSlice.actions;
export default filteringSlice.reducer;
