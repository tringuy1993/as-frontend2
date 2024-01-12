"use client";

import { useEffect, useState } from "react";
import { SelectUticker } from "./selectUTicker";
import { LIVE_OTM_DATES } from "@/lib/fetchdata/apiURLs";
import MainLoading from "../loading";
import useCustomSWR from "@/lib/fetchdata/fetch-custom";
import EChart0DTE from "@/components/ECharts/Live0DTE/EChart0DTE";
import { CustomSelect } from "@/components/selection/select-custom";
import { Card, CardHeader } from "@/components/ui/card";

function isLatestDateEqualToToday(dateList) {
  // Sort the list by date in descending order
  dateList.sort(
    (a: string, b: string) => new Date(b.saved_date) - new Date(a.saved_date),
  );

  // Get the latest date
  let latestDate = dateList[0].saved_date;

  // Get today's date formatted as YYYY-MM-DD
  let today = new Date().toISOString().slice(0, 10);

  let now = new Date();
  let isAfterTwoThirty =
    now.getUTCHours() > 14 ||
    (now.getUTCHours() === 14 && now.getUTCMinutes() > 30);

  // Compare and return the appropriate date
  if (latestDate === today && isAfterTwoThirty) {
    return { is0DTE: true, date: today };
  } else {
    return { is0DTE: false, date: latestDate };
  }
}
export default function PageLive0DTE() {
  const [uTicker, setUTicker] = useState("$SPX.X");
  const [uDate, setUDate] = useState("");

  const handleDateChange = (newDate: string) => {
    setUDate(newDate);
  };

  const { data: uDateData, isLoading } = useCustomSWR(LIVE_OTM_DATES, {
    und_symbol: uTicker,
  });

  useEffect(() => {
    if (uDateData && !isLoading) {
      const selectedDate = isLatestDateEqualToToday(uDateData.data);
      setUDate(selectedDate.date);
    }
  }, [uDateData]);

  if (!uDateData || isLoading) {
    return <MainLoading />;
  }

  const convertedArray = uDateData?.data.map((item) => ({
    label: item.saved_date,
    value: item.saved_date,
  }));
  const chartParams = { und_symbol: uTicker, date: uDate };

  return (
    <div className="flex flex-col items-center justify-center">
      <header>
        {" "}
        <SelectUticker uTicker={uTicker} setUTicker={setUTicker} />
        <CustomSelect
          items={convertedArray}
          value={uDate}
          onUpdate={handleDateChange}
        />
      </header>

      <Card className="w-full mx-10">
        <EChart0DTE params={chartParams} />
      </Card>
    </div>
  );
}
