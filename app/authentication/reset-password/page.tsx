import Link from "next/link";
// import { LoginForm } from "@/components/forms";
// import { SocialButtons } from "@/components/common";
import type { Metadata } from "next";
import { FormLogin } from "@/components/forms/form-login";
import { FormResetPassword } from "@/components/forms/form-resetpassword";

export const metadata: Metadata = {
  title: "Full Auth | Login",
  description: "Full Auth login page",
};

export default function PageResetPassword() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Full Auth"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Reset Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormResetPassword />
        {/* <SocialButtons /> */}

        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
