import { Icons } from "@/components/icons";
import Link from "next/link";
import { ReactNode } from "react";

interface AuthLayoutProps {
  titleValue: "signin" | "resetpassword";
  children: ReactNode;
}

const titleMap = {
  signin: "Sign In to your account",
  resetpassword: "Reset Password",
};

const RegisterLink = () => {
  return (
    <p className="mt-5 text-center text-sm text-gray-500">
      Don&apos;t have an account?{" "}
      <Link
        href="/authentication/register"
        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        Register here
      </Link>
    </p>
  );
};

export default function AuthenticationLayout({
  titleValue,
  children,
}: AuthLayoutProps) {
  const title = titleMap[titleValue];
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Icons.logo className="mx-auto w-auto h-20 w-20" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          {title}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {children}
        <>
          {titleValue === "resetpassword" ? (
            <RegisterLink />
          ) : (
            <>
              {" "}
              <RegisterLink />
              <p className=" text-center text-sm text-gray-500">
                Forgot password?{" "}
                <Link
                  href="/authentication/reset-password"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Reset Password
                </Link>
              </p>
            </>
          )}
        </>
      </div>
    </div>
  );
}
