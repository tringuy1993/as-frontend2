import React from "react";
import { EChartTime_Opts } from "./EChartTime_Opts";
import { EChartThemed } from "../EChartThemed";
import useCustomSWR from "@/lib/fetchdata/fetch-custom";
import { ALL_URL } from "@/lib/fetchdata/apiURLs";
import { modify_time_data } from "../UtilECharts";

const EChartTime = ({ params }) => {
  const { data, isLoading } = useCustomSWR(ALL_URL, params);

  if (!data || isLoading) {
    return <div> Is Loading</div>;
  }

  const modifiedData = modify_time_data(data?.data, params.greek).modified_data;
  const { option: chartOptions, chartHeight } = EChartTime_Opts(modifiedData);

  return (
    <EChartThemed
      option={chartOptions}
      style={{ height: chartHeight }}
      notMerge={true}
    />
  );
};

export default EChartTime;
