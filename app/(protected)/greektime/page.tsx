"use client";

import { DateRangePicker } from "@/components/daterangepicker/date-range-picker";
import { getNextDate } from "@/components/daterangepicker/utils";
import { SelectGreek } from "@/components/selection/selection-greek";
import { useState } from "react";
import { format } from "date-fns";
import { SelectTicker } from "@/components/selection/selection-ticker";
import EChartTime from "@/components/ECharts/Time/EChartTime";

const formatDate = (dateobj: Date): string => {
  return format(dateobj, "yyyy-MM-dd");
}

export default function PageGreekTime() {
  // Select Date Range
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: getNextDate({ targetDayName: "Saturday" }),
  });

  //Select Greeks
  const [greek, setGreek] = useState("gamma");

  //Select Ticker

  const [ticker, setTicker] = useState("$SPX.X");

  const PARAMS = {
    und_symbol: ticker,
    greek: greek,
    startDate: formatDate(dateRange.from),
    endDate: formatDate(dateRange.to),
  };

  return (
    <div>
      <header className="flex justify-center items-center">
        <DateRangePicker
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to}
          onUpdate={(value) => setDateRange(value.range)}
        />
        <SelectGreek value={greek} onUpdate={(value) => setGreek(value)} />
        <SelectTicker
          value={ticker}
          onUpdate={(ticker) => {
            setTicker(ticker.toUpperCase());
          }}
        />
      </header>
      <main className="mx-10">
        <EChartTime params={PARAMS} />
      </main>
    </div>
  );
}
