"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { useEffect } from "react";

const dateRangeSchema = z.object({
  from: z.date(),
  to: z.date(),
});
const formCalendarFields = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export function DatePickerWithRange({
  className,
  dateRange,
  setDateRange,
}: React.HTMLAttributes<HTMLDivElement> & {
  dateRange: DateRange | undefined;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}) {
  //   const [date, setDate] = React.useState<DateRange | undefined>({
  //     from: new Date(2022, 0, 20),
  //     to: addDays(new Date(2022, 0, 20), 20),
  //   });

  const form = useForm<z.infer<typeof formCalendarFields>>({
    resolver: zodResolver(formCalendarFields),
    defaultValues: {
      dateRange: dateRange || { from: new Date(), to: new Date() },
    },
  });

  function onSubmit(values: z.infer<typeof formCalendarFields>) {
    // console.log(values);
    setDateRange(values.dateRange);
  }

  const formRef = React.useRef(null); // Create a ref for the form

  function handleAcceptClick() {
    console.log(formRef);
    if (formRef.current) {
      formRef.current.submit(); // Programmatically submit the form
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field && "text-muted-foreground",
                        )}
                      >
                        {field.value.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a dateRange</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value.from}
                        selected={field.value}
                        onSelect={(range) => {
                          return field.onChange(range);
                        }}
                        numberOfMonths={2}
                      />
                      <Button
                        type="button"
                        onClick={handleAcceptClick}
                        className="justify-end"
                      >
                        Accept
                      </Button>
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <Button type="submit" className="justify-end">
            Accept 2
          </Button>
        </form>
      </Form>
    </div>
  );
}
