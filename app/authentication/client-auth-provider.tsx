"use client";
import { useState, useEffect, useRef } from "react";
import {
  signInWithEmailAndPassword,
  IdTokenResult,
  signOut,
  User as FirebaseUser,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { AuthContext, User } from "./context";
import { Auth } from "./firebase1";

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface Tenant {
  id: string;
  name: string | null;
  email: string | null;
  photoUrl: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  // customClaims: CustomClaims;
  idToken: string;
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
      photoUrl: providerData.photoURL || null,
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
    photoUrl: user.photoURL || null,
    // customClaims: {},
    isAnonymous: user.isAnonymous,
    idToken: result.token,
  };
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // const firstLoadRef = useRef(true);
  const [tenant, setTenant] = useState<Tenant>();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const router = useRouter();
  const handleSignOut = async (): Promise<void> => {
    // const auth = await getFirebaseAuth();
    signOut(Auth);
    console.log("LogOut");
    router.refresh();
  };
  const handleAuthStateChanged = async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      const tokenResult = await firebaseUser?.getIdTokenResult();
      setTenant(mapFirebaseResponseToTenant(tokenResult, firebaseUser));
    } else {
      setTenant(null);
    }
    setIsAuthLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, handleAuthStateChanged);
    return unsubscribe;
  }, []);

  const contextData = {
    tenant: tenant,
    handleSignOut: handleSignOut,
    isAuthLoading: isAuthLoading,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
