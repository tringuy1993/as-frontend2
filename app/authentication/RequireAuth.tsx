"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { FBAuth } from "./firebase1";
import { setAuth } from "@/redux/features/authSlice";

// import { useAppSelector } from "@/redux/hooks";
// import { Spinner } from '@/components/common';

interface Props {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);
  console.log(isLoading, isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FBAuth, (userAuth) => {
      if (userAuth) {
        dispatch(
          setAuth({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          }),
        );
      }
    });
  });

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        {/* <Spinner lg /> */}
        loading...
      </div>
    );
  }

  return <>{children}</>;
}
