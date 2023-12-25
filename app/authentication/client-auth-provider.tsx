"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
  startTransition,
} from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  IdTokenResult,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "./firebase2";
import { clientConfig } from "@/config/firebase-client-config";
import { AuthContext, User } from "./context";

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
  const { getFirebaseAuth } = useFirebaseAuth(clientConfig);
  //   const [user, setUser] = useState(null);
  const firstLoadRef = useRef(true);
  const [tenant, setTenant] = useState<Tenant>();
  const [errMsg, setErrMsg] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    const auth = await getFirebaseAuth();
    setAuthLoading(true);
    await signInWithEmailAndPassword(auth, e.username, e.password)
      .then(() => {
        // setAuthLoading(false);
        router.push("/");
      })
      .catch((error) => {
        setErrMsg(error.code);
        // setAuthLoading(false);
      })
      .finally(() => setAuthLoading(false));
  };

  const handleSignOut = async (): Promise<void> => {
    const auth = await getFirebaseAuth();
    signOut(auth);
    console.log("LogOut");
    router.refresh();
  };

  const handleAuthStateChanged = async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser && tenant && firebaseUser.uid === tenant.id) {
      firstLoadRef.current = false;
      return;
    }

    if (!firebaseUser) {
      firstLoadRef.current = false;
      startTransition(() => {
        setTenant(null);
      });
    }

    firstLoadRef.current = false;

    const tokenResult = await firebaseUser?.getIdTokenResult();

    startTransition(() => {
      setTenant(mapFirebaseResponseToTenant(tokenResult, firebaseUser));
    });
  };

  const registerChangeListener = async () => {
    const auth = await getFirebaseAuth();
    const { onIdTokenChanged } = await import("firebase/auth");
    return onIdTokenChanged(auth, handleAuthStateChanged);
  };

  useEffect(() => {
    const unsubscribePromise = registerChangeListener();
    return () => {
      unsubscribePromise.then((unsubscribe) => unsubscribe());
    };
  }, []);
  //   useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(FBAuth, async (currentUser) => {
  //       setUser(currentUser);
  //       setPending(false);
  //     });

  //     return unsubscribe;
  //   });

  // Define a function to refresh the id_token
  // const refreshIdToken = async () => {
  //   return await FBAuth.currentUser?.getIdToken(true);
  // };
  console.log(tenant);
  const contextData = {
    tenant: tenant,
    handleSignIn: handleSignIn,
    handleSignOut: handleSignOut,
    errMsg: errMsg,
    authLoading: authLoading,
    // refreshIdToken: refreshIdToken,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
