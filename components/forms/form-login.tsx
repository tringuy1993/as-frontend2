"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "@/app/authentication/firebase1";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormUserMaster } from "./form-user-master";

const formLoginFields = z.object({
  email: z.string().email({
    message: "Invalaid email address.",
  }),
  password: z.string().min(2),
});

const loginINFO = [
  {
    name: "email",
    label: "Email",
    placeHolder: "email@gmail.com",
    description: null,
    inputType: null,
  },
  {
    name: "password",
    label: "Password",
    placeHolder: "Your password",
    description: null,
    inputType: "password",
  },
];

export function FormLogin() {
  // ...
  const router = useRouter();
  const [errMsg, setErrMsg] = useState("");

  const form = useForm<z.infer<typeof formLoginFields>>({
    resolver: zodResolver(formLoginFields),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (e) => {
    await signInWithEmailAndPassword(Auth, e.email, e.password)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        setErrMsg(error.code);
      });
  };

  function onSubmit(values: z.infer<typeof formLoginFields>) {
    form.resetField("password");
    handleSignIn(values);
  }

  return (
    <>
      <FormUserMaster
        formArrayFields={loginINFO}
        onSubmit={onSubmit}
        form={form}
        submitButtonName={"Login"}
      >
        <Button type="submit">Sign In</Button>
      </FormUserMaster>
      <div className="mt-10 text-center text-sm text-gray-500"> {errMsg} </div>
    </>
  );
}
