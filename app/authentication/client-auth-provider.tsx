"use client";

import { useState, useEffect, useRef } from "react";
import {
  IdTokenResult,
  signOut,
  User as FirebaseUser,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { AuthContext, Tenant } from "./context";
import { Auth } from "./firebase1";

interface AuthProviderProps {
  children: React.ReactNode;
}

const mapFirebaseResponseToTenant = (
  result: IdTokenResult,
  user: FirebaseUser,
): Tenant => {
  const providerData = user.providerData && user.providerData[0];

  if (!user.isAnonymous && providerData) {
    return {
      id: user.uid,
      name: providerData.displayName || user.displayName || user.email || null,
      email: providerData.email || null,
      emailVerified: user.emailVerified || false,
      photoURL: providerData.photoURL || null,
      //   customClaims: {},
      isAnonymous: user.isAnonymous,
      idToken: result.token,
    };
  }

  return {
    id: user.uid,
    name: user.displayName || providerData?.displayName || user.email || null,
    email: user.email || null,
    emailVerified: user.emailVerified || false,
    photoURL: user.photoURL || null,
    // customClaims: {},
    isAnonymous: user.isAnonymous,
    idToken: result.token,
  };
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // const firstLoadRef = useRef(true);
  const [currentUser, setCurrentUser] = useState();
  const [tenant, setTenant] = useState<Tenant>();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const router = useRouter();
  const handleSignOut = async (): Promise<void> => {
    signOut(Auth);
    localStorage.removeItem("tenant");
    console.log("LogOut");
    router.refresh();
  };
  const handleAuthStateChanged = async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      setCurrentUser(firebaseUser);
      const tokenResult = await firebaseUser?.getIdTokenResult();
      const tenant = mapFirebaseResponseToTenant(tokenResult, firebaseUser);
      setTenant(tenant);
      localStorage.setItem("tenant", JSON.stringify(tenant));
    } else {
      setCurrentUser(firebaseUser);
      setTenant(null);
    }
    setIsAuthLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, handleAuthStateChanged);
    return unsubscribe;
  }, []);

  const contextData = {
    currentUser: currentUser,
    tenant: tenant,
    handleSignOut: handleSignOut,
    isAuthLoading: isAuthLoading,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
