"use client";
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

export function FormUserMaster({
  formArrayFields,
  form,
  onSubmit,
  submitButtonName,
  children,
}) {
  // ...

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {formArrayFields.map((item) => (
          <FormField
            key={item.label + item.description}
            control={form.control}
            name={item.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{item.label}</FormLabel>
                <FormControl>
                  <Input
                    type={item.inputType}
                    placeholder={item.placeHolder}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{item.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {children}
      </form>
    </Form>
  );
}
