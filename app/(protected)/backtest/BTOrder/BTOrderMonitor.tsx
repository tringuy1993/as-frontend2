import { useEffect, useMemo, useState } from "react";
import {
  useBTDatePickerStore,
  useBTOrderStore,
  useBTTimePickerStore,
} from "@/store";
import { ColumnDef } from "@tanstack/react-table";
import { BTOrderTable } from "./BTOrder";
import { format } from "date-fns";
import useCustomSWR from "@/lib/fetchdata/fetch-custom";
import { BACKTEST_TRACK_ORDER } from "@/lib/fetchdata/apiURLs";
import MainLoading from "@/app/loading";

type StateData = {
  quote_datetime: string;
  option_type: boolean;
  price: number;
  expiration: string;
  strike: number;
};

const processResultData = (data, order) => {
  return data.map((item) => {
    const { option_type, strike, expiration, quote_datetime, gamma, delta } =
      item;

    const matchedItem = order.legs.find(
      (element) =>
        element.option_type === option_type &&
        element.strike === strike &&
        element.expiration === expiration,
      // element.quote_datetime === quote_datetime,
    );

    const buy_type = matchedItem?.buy_type;
    return {
      option_type,
      strike,
      expiration,
      quote_datetime,
      price: buy_type === "ask" ? item[buy_type] : -1 * item[buy_type],
      gamma,
      delta,
    };
  });
};

const calculatePNL = (result, order) => {
  const currentOrderPrice = result.reduce((acc, leg) => acc + leg.price, 0);
  return order.orderCost >= 0
    ? (currentOrderPrice - order.orderCost).toFixed(2)
    : (-1 * order.orderCost + currentOrderPrice).toFixed(2);
};

export const BTOrderMonitor = () => {
  const { order } = useBTOrderStore();
  const { BackTestDate } = useBTDatePickerStore();
  const { BackTestTime } = useBTTimePickerStore();
  const [result, setResult] = useState([]);
  const [pnl, setPNL] = useState("");

  const params = {
    trade_date: format(BackTestDate.from, "yyyy-MM-dd"),
    expiration: format(BackTestDate.to as Date, "yyyy-MM-dd"),
    trade_time: BackTestTime,
    option_legs: JSON.stringify(order.legs),
  };
  // useEffect(() => {
  //   setData(legs);
  // }, [legs]);
  const { data, isLoading } = useCustomSWR(BACKTEST_TRACK_ORDER, params);

  useEffect(() => {
    if (data && data?.data) {
      const newResult = processResultData(data.data, order);
      setResult(newResult);
      const newPNL = calculatePNL(newResult, order);
      setPNL(newPNL);
    }
  }, [data]);

  const color = Number(pnl) >= 0 ? "green" : "red";
  const columns = useMemo<ColumnDef<StateData>[]>(
    () => [
      {
        accessorKey: "quote_datetime",
        header: "Trade Time",
      },
      {
        accessorKey: "expiration",
        header: "Exp",
      },
      {
        accessorKey: "strike", //normal accessorKey
        header: "Strike",
      },
      {
        accessorFn: (row) => {
          return row.option_type === true ? "call" : "put";
        },
        header: "Option Type",
      },
      {
        accessorKey: "price",
        header: "Price",
        footer: () => {
          return (
            <div style={{ color: color }}>
              <div>Trade Price: {order.orderCost} </div>

              <div>PNL: {pnl}</div>
            </div>
          );
        },
      },
    ],
    [data, pnl],
  );

  console.log(data);
  if (!data || isLoading) {
    return <MainLoading />;
  }

  return <BTOrderTable data={result} columns={columns} />;
};
