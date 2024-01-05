import { useEffect, useMemo, useState } from "react";
import { useBTSelectedLegsStore } from "@/store";
import { ColumnDef } from "@tanstack/react-table";
import { BTOrderTable } from "./BTOrder";
import { Button } from "@/components/ui/button";

type StateData = {
  quote_datetime: string;
  option_type: boolean;
  price: number;
  expiration: string;
  strike: number;
};
export const OrderEntry = () => {
  const { legs, legsPriceSum, setOrder } = useBTSelectedLegsStore();
  const [data, setData] = useState(legs);

  useEffect(() => {
    setData(legs);
  }, [legs]);

  const color = legsPriceSum >= 0 ? "green" : "red";
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
              <div>Total: {legsPriceSum.toFixed(2)} </div>

              <div>
                <Button onClick={setOrder}>Submit Order</Button>
              </div>
            </div>
          );
        },
      },
    ],
    [legsPriceSum],
  );

  return <BTOrderTable data={data} columns={columns} />;
};
