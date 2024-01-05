"use client";

import { format } from "date-fns";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import EChartBT_Theo from "@/components/ECharts/BackTest/EChartBT_Theo";
import BTDatePicker from "@/components/bt-date-picker";
import { BTTimeSlider } from "@/components/bt-time-slider";
import { BTOrderMonitor } from "./BTOrder/BTOrderMonitor";

import { useBTDatePickerStore, useBTTimePickerStore } from "@/store";
import { OrderEntry } from "./BTOrder/BTOrderView";

import BTOptionChain from "./BTOptionChain/BTOptionChain";

export default function PageBTOrder() {
  const { BackTestDate } = useBTDatePickerStore();
  const { BackTestTime } = useBTTimePickerStore();

  const PARAMS = {
    trade_date: format(BackTestDate.from, "yyyy-MM-dd"),
    expiration: format(BackTestDate.to as Date, "yyyy-MM-dd"),
    trade_time: BackTestTime,
    all_greeks: true,
  };
  return (
    <div className="flex flex-col justify-center mx-20 mt-4 space-y-2 align-center">
      <BTDatePicker />
      <BTTimeSlider />
      <Card>
        <CardHeader className="text-2xl font-extrabold">
          Your Current Position
        </CardHeader>
        <CardContent>
          <BTOrderMonitor />
        </CardContent>
      </Card>

      <Tabs defaultValue="btGraphs" className="">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="btGraphs">Graphs</TabsTrigger>
          <TabsTrigger value="btOptionChain">Option Chain</TabsTrigger>
        </TabsList>
        <TabsContent value="btGraphs">
          <Card>
            <CardContent className="space-y-2">
              <EChartBT_Theo params={PARAMS} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="btOptionChain" className="space-y-2">
          <Card>
            <CardHeader className="text-center text-4xl font-extrabold">
              Enter Order
            </CardHeader>
            <CardContent>
              <OrderEntry />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center text-4xl font-extrabold">
              Option Chain
            </CardHeader>
            <CardContent>
              <BTOptionChain params={PARAMS} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
