// import { Box, Button, Stack } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useBTSelectedLegsStore } from "@/store";
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
        footer: () => (
          //   <Stack>
          //     <Box style={{ color: color }}>Total: {legsPriceSum.toFixed(2)}</Box>

          //   </Stack>
          <div>
            <Button onClick={setOrder}>Submit Order</Button>
          </div>
        ),
      },
    ],
    [legsPriceSum],
  );

  const table = useReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enablePagination: false,
    enableStickyHeader: true,
    enableGlobalFilter: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableTopToolbar: false,
    mantineTableContainerProps: { sx: { minHeight: "200px" } },
    enableTableFooter: true,
  });

  return (
    <div>
      <h1> Enter Order </h1>
      <Data table={table} />
    </div>
  );
};
