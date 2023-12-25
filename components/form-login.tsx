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
import { useAuth } from "@/app/authentication/context";

const formLoginFields = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2),
});

export function FormLogin() {
  // ...
  const { handleSignIn } = useAuth();
  const form = useForm<z.infer<typeof formLoginFields>>({
    resolver: zodResolver(formLoginFields),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formLoginFields>) {
    console.log(values);
    handleSignIn(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username/Email</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
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
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// // import { useLogin } from "@/hooks";
// // import { Form } from "@components/ui/forms";
// import { Form } from "./ui/form";

// export function FormLogin() {
//   //   const { email, password, isLoading, onChange, onSubmit } = useLogin();

//   const config = [
//     {
//       labelText: "Email address",
//       labelId: "email",
//       type: "email",
//       value: "email",
//       required: true,
//     },
//     {
//       labelText: "Password",
//       labelId: "password",
//       type: "password",
//       value: "password",
//       link: {
//         linkText: "Forgot password?",
//         linkUrl: "/password-reset",
//       },
//       required: true,
//     },
//   ];

//   return (
//     <Form
//       config={config}
//       isLoading={isLoading}
//       btnText="Sign in"
//       onChange={onChange}
//       onSubmit={onSubmit}
//     />
//   );
// }
