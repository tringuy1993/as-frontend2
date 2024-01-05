"use client";
import BTDatePicker from "@/components/bt-date-picker";
import { BTTimeSlider } from "@/components/bt-time-slider";
import { TabsDemo } from "./Tabs";

export default function PageBackTest() {
  return (
    <div className="mx-20 mt-4">
      <BTDatePicker />
      <BTTimeSlider />
      <TabsDemo />
    </div>
  );
}
