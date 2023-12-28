"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "@/app/authentication/firebase1";

import { useState } from "react";
import { useRouter } from "next/navigation";

const formLoginFields = z.object({
  email: z.string().email({
    message: "Invalaid email address.",
  }),
  password: z.string().min(2),
});

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username/Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              {errMsg && (
                <FormMessage className="text-right">{errMsg}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormDescription className="text-right">
                <Link href="/authentication/reset-password" passHref>
                  Forgot Password?{" "}
                </Link>
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">SignIn</Button>
      </form>
    </Form>
  );
}
