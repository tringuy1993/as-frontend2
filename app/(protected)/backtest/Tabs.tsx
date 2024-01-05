import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useBTDatePickerStore, useBTTimePickerStore } from "@/store";
import { format } from "date-fns";
import EChartBT_Theo from "@/components/ECharts/BackTest/EChartBT_Theo";
import BTOptionChain from "./BTOptionChain/BTOptionChain";

export function TabsDemo() {
  const { BackTestDate } = useBTDatePickerStore();
  const { BackTestTime } = useBTTimePickerStore();

  const PARAMS = {
    trade_date: format(BackTestDate.from, "yyyy-MM-dd"),
    expiration: format(BackTestDate.to as Date, "yyyy-MM-dd"),
    trade_time: BackTestTime,
    all_greeks: true,
  };
  return (
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
      <TabsContent value="btOptionChain">
        <Card>
          <BTOptionChain params={PARAMS} />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
