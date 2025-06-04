import { useDispatch } from "react-redux";
import { AppDispatch } from "../_RTK/store";

export const useAppDispatcher = () => {
  return useDispatch<AppDispatch>();
};
