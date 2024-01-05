import { useBTDatePickerStore } from "@/store";
import { DateRangePicker } from "./daterangepicker/date-range-picker";

export default function BTDatePicker() {
  const { BackTestDate, updateBackTestDate } = useBTDatePickerStore();

  return (
    <DateRangePicker
      initialDateFrom={BackTestDate.from}
      initialDateTo={BackTestDate.to}
      onUpdate={(e) => {
        updateBackTestDate(e.range);
      }}
    />
  );
}
