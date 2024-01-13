"use client";

import { DateRangePicker } from "@/components/daterangepicker/date-range-picker";
import { getNextDate } from "@/components/daterangepicker/utils";
import { SelectGreek } from "@/components/selection/selection-greek";
import { useState } from "react";
import { format } from "date-fns";
import EChartES from "@/components/ECharts/ES/EChartES";
import EChartToSALL from "@/components/ECharts/ToS/EChartToS_ALL";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ToS_Theo_Chart } from "./ToS_Theo_Chart";

function formatDate(dateobj: Date): string {
  return format(dateobj, "yyyy-MM-dd");
}

export default function PageOptions() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: getNextDate({ targetDayName: "Saturday" }),
  });

  const [greek, setGreek] = useState("gamma");

  // State to manage the mode
  const [isTheoGreek, setIsTheoGreek] = useState(false);
  // Function to toggle the mode
  const toggleMode = () => setIsTheoGreek(!isTheoGreek);
  const theoStatus = isTheoGreek ? "Theo" : "NonTheo";

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

  const theoParams = {
    greek: greek,
    startDate: formatDate(dateRange.from),
    endDate: formatDate(dateRange.to),
  };

  return (
    <div
      style={{
        transition: "margin 0.3s ease-in-out",
      }}
      className="flex flex-col items-center mx-2.5"
    >
      <header className="space-y-4 text-center">
        <DateRangePicker
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to}
          onUpdate={(value) => setDateRange(value.range)}
        />
        <SelectGreek value={greek} onUpdate={(value) => setGreek(value)} />
        <div className="flex items-center justify-center space-x-2">
          <Switch
            id="nonTheo-mode-switch"
            checked={isTheoGreek}
            onCheckedChange={toggleMode}
          />
          <Label htmlFor="nonTheo-mode-switch">{theoStatus}</Label>
        </div>
      </header>
      <div className="space-y-4 w-full">
        {!isTheoGreek ? (
          <>
            {" "}
            <EChartES params={esParams} />
            <EChartToSALL params={tosParams} />
          </>
        ) : (
          <ToS_Theo_Chart params={theoParams} />
        )}
      </div>
    </div>
  );
}
