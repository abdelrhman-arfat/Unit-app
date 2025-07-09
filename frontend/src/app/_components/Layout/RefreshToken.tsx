"use client";
import { logout, setUserData } from "@/app/_RTK/redux-slices/UserSlice";
import { useRefreshTokenQuery } from "@/app/_RTK/RTK-query/RTKQuery";
import { useAppDispatcher } from "@/app/hooks/AppDispatcher";
import { useUserSelector } from "@/app/hooks/Selectors";
import { useEffect } from "react";
import toast from "react-hot-toast";
const RefreshToken = () => {
  const user = useUserSelector();

  const dispatch = useAppDispatcher();
  const { data, refetch, isError } = useRefreshTokenQuery();
  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (!user.isLoggedIn) {
          if (data?.data?.data && [200, 201].includes(data.status)) {
            dispatch(setUserData(data.data.data));
          }
        }
        if (isError && user.isLoggedIn) {
          dispatch(logout());
        }
      } catch (err) {
        const error = err as Error;
        toast.error(error.message);
      }
    };

    fetchToken();
    const interval = setInterval(() => refetch(), 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user, isError, data, dispatch, refetch]);
  return null;
};

export default RefreshToken;
