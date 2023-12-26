"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const GREEKMENU = [
  { label: "Gamma", value: "gamma" },
  { label: "Vanna", value: "vanna" },
  { label: "Charm", value: "charm" },
  { label: "Delta", value: "delta" },
  { label: "Theta", value: "theta" },
  { label: "Vomma", value: "vomma" },
];

interface SelectGreekProps {
  value: string;
  onUpdate: (value: string) => void;
}

export function SelectGreek({ value = "gamma", onUpdate }: SelectGreekProps) {
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState("gamma");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? GREEKMENU.find((greek) => greek.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Greek" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {GREEKMENU.map((greek) => (
              <CommandItem
                key={greek.value}
                value={greek.value}
                onSelect={(currentValue) => {
                  onUpdate(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === greek.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {greek.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
