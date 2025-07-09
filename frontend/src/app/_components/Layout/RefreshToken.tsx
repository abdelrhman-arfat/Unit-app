"use client";
import { logout, setUserData } from "@/app/_RTK/redux-slices/UserSlice";
import { useAppDispatcher } from "@/app/hooks/AppDispatcher";
import { axiosInstance } from "@/app/utils/api/axiosInstance";
import { useCallback, useEffect } from "react";
const RefreshToken = () => {
  const dispatch = useAppDispatcher();
  const refresh = useCallback(async () => {
    const res = await axiosInstance.get("/auth/refresh-token");
    if (res.status !== 200) {
      dispatch(logout());
    }
    dispatch(setUserData(res.data.data.data));
    return res;
  }, [dispatch]);
  useEffect(() => {
    refresh();
    const interval = setInterval(
      () => {
        refresh();
      },
      1000 * 60 * 10
    );

    return () => clearInterval(interval);
  }, [refresh]);
  return null;
};

export default RefreshToken;
