"use client";
import { DateRangePicker } from "@/components/daterangepicker/date-range-picker";
import { getNextDate } from "@/components/daterangepicker/utils";
import { SelectGreek } from "@/components/selection/selection-greek";
import { useState } from "react";

export default function PageOptions() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: getNextDate({ targetDayName: "Saturday" }),
  });

  const [greek, setGreek] = useState("gamma");

  console.log(greek);
  console.log(dateRange);
  return (
    <div className="flex justify-center items-center">
      <DateRangePicker
        initialDateFrom={dateRange.from}
        initialDateTo={dateRange.to}
        onUpdate={(value) => setDateRange(value.range)}
      />
      <SelectGreek value={greek} onUpdate={(value) => setGreek(value)} />
    </div>
  );
}
