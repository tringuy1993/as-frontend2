import EChartBT_Theo from "@/components/ECharts/BackTest/EChartBT_Theo";
import { useBTDatePickerStore, useBTTimePickerStore } from "@/store";
import { format } from "date-fns";
// import { Monitor } from "./Monitor";

export const BackTestCharts = () => {
  const { BackTestDate } = useBTDatePickerStore();
  const { BackTestTime } = useBTTimePickerStore();

  const PARAMS = {
    trade_date: format(BackTestDate.from, "yyyy-MM-dd"),
    expiration: format(BackTestDate.to as Date, "yyyy-MM-dd"),
    trade_time: BackTestTime,
    all_greeks: true,
  };

  return <EChartBT_Theo params={PARAMS} />;
};
