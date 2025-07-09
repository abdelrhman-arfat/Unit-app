import { User } from "@/app/types/User";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  isLoggedIn: boolean;
  user: User;
} = {
  isLoggedIn: false,
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state = {
        isLoggedIn: true,
        user: action.payload,
      };
      return state;
    },
    logout: () => {
      return initialState;
    },
  },
});
export const { setUserData, logout } = userSlice.actions;
export default userSlice.reducer;
