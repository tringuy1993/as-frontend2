import { CustomSelect } from "@/components/selection/select-custom";
import { LIVE_OTM_UTICKERS } from "@/lib/fetchdata/apiURLs";
import useCustomSWR from "@/lib/fetchdata/fetch-custom";
import MainLoading from "../loading";

export function SelectUticker({ uTicker, setUTicker }) {
  const { data, isLoading } = useCustomSWR(LIVE_OTM_UTICKERS);

  if (!data || isLoading) {
    return <MainLoading />;
  }

  const convertedArray = data?.data.map((item) => ({
    label: item.uticker,
    value: item.uticker,
  }));

  return (
    <CustomSelect
      items={convertedArray}
      value={uTicker}
      onUpdate={(e) => setUTicker(e.toUpperCase())}
    ></CustomSelect>
  );
}
