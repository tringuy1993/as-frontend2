import { FormLogin } from "@/components/forms/form-login";
import { Metadata } from "next";
import AuthenticationLayout from "../AuthenticationLayout";

export const metadata: Metadata = {
  title: "Authentication | Signin",
  description: "Authentication Signin",
};
export default function PageSignIn() {
  return (
    <AuthenticationLayout titleValue="signin">
      <FormLogin />
    </AuthenticationLayout>
  );
}
