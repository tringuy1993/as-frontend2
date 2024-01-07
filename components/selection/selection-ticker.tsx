"use client";

import * as React from "react";
import { CustomSelect } from "./select-custom";

const TICKERMENU = [
  { label: "ES", value: "ES" },
  { label: "SPX", value: "$SPX.X" },
  { label: "VIX", value: "$VIX.X" },
  { label: "SPY", value: "SPY" },
  { label: "QQQ", value: "QQQ" },
  //   { label: "IWM", value: "IWM" },
  { label: "NDX", value: "$NDX.X" },
];

interface SelectProps {
  value: string;
  onUpdate: (value: string) => void;
}

export function SelectTicker({ value = "$SPX.X", onUpdate }: SelectProps) {
  // console.log(value);
  return (
    <CustomSelect
      items={TICKERMENU}
      value={value.toUpperCase()}
      onUpdate={(e) => onUpdate(e.toUpperCase())}
    />
  );
}
