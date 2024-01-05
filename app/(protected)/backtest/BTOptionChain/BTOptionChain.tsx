import MainLoading from "@/app/loading";
import { BACKTEST_OPT_CHAIN } from "@/lib/fetchdata/apiURLs";
import useCustomSWR from "@/lib/fetchdata/fetch-custom";
import { DataTable } from "./btOptionChainDataTable";
import { columns } from "./btOptionChainColumns";
import { useMemo } from "react";

export default function BTOptionChain({ params }) {
  const { data, isLoading } = useCustomSWR(BACKTEST_OPT_CHAIN, params);

  const mergedData = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.data["call"].map((callItem, i) => ({
      put: data.data["put"][i],
      call: callItem,
    }));
  }, [data]); // Dependency array - only recompute if `data` changes

  if (!data || isLoading) {
    return <MainLoading />;
  }
  return <DataTable columns={columns} data={mergedData} />;
}
