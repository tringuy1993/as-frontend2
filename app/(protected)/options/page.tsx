"use client";
import { DateRangePicker } from "@/components/daterangepicker/date-range-picker";
import { getNextDate } from "@/components/daterangepicker/utils";
import { SelectGreek } from "@/components/selection/selection-greek";
import { useState } from "react";
import { format } from "date-fns";
import EChartES from "@/components/ECharts/ES/EChartES";
import EChartToSALL from "@/components/ECharts/ToS/EChartToS_ALL";

export function formatDate(dateobj: Date): string {
  return format(dateobj, "yyyy-MM-dd");
}

export default function PageOptions() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: getNextDate({ targetDayName: "Saturday" }),
  });

  const [greek, setGreek] = useState("gamma");

  const tickers = ["$SPX.X", "SPY", "QQQ", "$NDX.X", "$RUT.X"];
  const tosParams = {
    und_symbol: tickers,
    greek: greek,
    startDate: dateRange.from,
    endDate: dateRange.to,
  };

  const esParams = {
    und_symbol: "ES",
    greek: greek,
    startDate: formatDate(dateRange.from),
    endDate: formatDate(dateRange.to),
  };

  return (
    <div>
      <header className="flex justify-center items-center">
        {" "}
        <DateRangePicker
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to}
          onUpdate={(value) => setDateRange(value.range)}
        />
        <SelectGreek value={greek} onUpdate={(value) => setGreek(value)} />
      </header>
      <div className="space-y-4">
        <EChartES params={esParams} />
        <EChartToSALL params={tosParams} />
      </div>
    </div>
  );
}
