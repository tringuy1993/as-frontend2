"use client";

import { createContext, useContext } from "react";

import type { UserInfo } from "firebase/auth";

export interface User extends Omit<UserInfo, "providerId"> {
  emailVerified: boolean;
}

export interface AuthContextValue {
  tenant: User | null;
}

export const AuthContext = createContext<AuthContextValue>({
  tenant: null,
});

export const useAuth = () => useContext(AuthContext);
