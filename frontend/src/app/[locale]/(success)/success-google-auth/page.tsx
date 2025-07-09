"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useGetMeQuery } from "@/app/_RTK/RTK-query/RTKQuery";
import { setUserData } from "@/app/_RTK/redux-slices/UserSlice";
import { useAppDispatcher } from "@/app/hooks/AppDispatcher";

const OAuthSuccess = () => {
  const router = useRouter();
  const dispatch = useAppDispatcher();

  const { data, isLoading, isError, isSuccess } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess && data?.data?.data) {
      dispatch(setUserData(data.data.data));
      router.replace("/main");
    }
  }, [isSuccess, data, dispatch, router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md text-center shadow-2xl border border-indigo-200 rounded-2xl bg-white">
        <CardContent className="p-8 flex flex-col items-center gap-5">
          {isLoading && (
            <>
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              <h2 className="text-lg font-semibold text-indigo-700">
                Signing you in...
              </h2>
              <p className="text-sm text-gray-500">
                Please wait while we verify your account.
              </p>
            </>
          )}
          {isSuccess && (
            <>
              <h2 className="text-xl font-semibold text-indigo-600">
                Signed in successfully
              </h2>
              <p className="text-gray-500 text-sm">
                You are now signed in to your account.
              </p>
              <Button
                variant="outline"
                className="mt-4 text-indigo-600 border-indigo-400 hover:bg-indigo-50"
                onClick={() => router.replace("/main")}
              >
                Go to Dashboard
              </Button>
            </>
          )}
          {isError && (
            <>
              <h2 className="text-xl font-semibold text-red-600">
                Login failed
              </h2>
              <p className="text-gray-500 text-sm">
                Something went wrong while logging in.
              </p>
              <Button
                variant="outline"
                className="mt-4 text-indigo-600 border-indigo-400 hover:bg-indigo-50"
                onClick={() => router.replace("/")}
              >
                Back to Home
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OAuthSuccess;
