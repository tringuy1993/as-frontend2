import type { Metadata } from "next";
import { FormResetPassword } from "@/components/forms/form-resetpassword";
import AuthenticationLayout from "../AuthenticationLayout";

export const metadata: Metadata = {
  title: "Authentication | Reset Password",
  description: "Authentication reset password",
};

export default function PageResetPassword() {
  return (
    <AuthenticationLayout titleValue="resetpassword">
      <FormResetPassword />
    </AuthenticationLayout>
  );
}
