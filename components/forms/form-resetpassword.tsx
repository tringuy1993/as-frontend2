"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Auth } from "@/app/authentication/firebase1";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

const formResetPasswordFields = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function FormResetPassword() {
  const [isSent, setIsSent] = useState(false);

  const form = useForm<z.infer<typeof formResetPasswordFields>>({
    resolver: zodResolver(formResetPasswordFields),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formResetPasswordFields>) {
    console.log(values);
    sendPasswordResetEmail(Auth, values.email)
      .then(() => {
        setIsSent(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        form.resetField("email");
      });
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
            </FormItem>
          )}
        />
        <Button type="submit">Reset Password</Button>
      </form>
      {isSent && <p>Instructions sent. Please check your email.</p>}
    </Form>
  );
}
