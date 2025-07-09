import { useSelector } from "react-redux";
import { RootState } from "../_RTK/store";

export const useLangSelector = () => {
  const lang = useSelector((state: RootState) => state.languages);
  return lang;
};

export const useUserSelector = () => {
  const user = useSelector((state: RootState) => state.user);
  return user;
};

export const useFilterSelector = () => {
  const filter = useSelector((state: RootState) => state.filtering);
  return filter;
};
