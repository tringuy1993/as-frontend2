"use client";

import { createContext, useContext } from "react";

import type { UserInfo } from "firebase/auth";

export interface User extends Omit<UserInfo, "providerId"> {
  emailVerified: boolean;
}

export interface Tenant {
  id: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  // customClaims: CustomClaims;
  idToken: string;
}

export interface AuthContextValue {
  currentUser: User | null;
  tenant: Tenant | null;
  handleSignOut: () => Promise<void> | void; // Adjust according to the actual implementation
  isAuthLoading: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  tenant: null,
  handleSignOut: async () => {}, // Provide a default implementation
  isAuthLoading: true,
});

export const useAuth = () => useContext(AuthContext);
