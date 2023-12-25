"use client";

import { redirect } from "next/navigation";
import { useAuth } from "./context";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
  const { tenant, isAuthLoading } = useAuth();
  // console.log("REquireAuth:", tenant);

  useEffect(() => {
    if (!isAuthLoading && !tenant) {
      redirect("/authentication/signin");
    }
  }, [tenant, isAuthLoading]);
  return <>{children}</>;
}
