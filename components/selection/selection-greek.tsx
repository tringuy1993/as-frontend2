"use client";

import * as React from "react";
import { CustomSelect } from "./select-custom";

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
  return <CustomSelect items={GREEKMENU} value={value} onUpdate={onUpdate} />;
}
