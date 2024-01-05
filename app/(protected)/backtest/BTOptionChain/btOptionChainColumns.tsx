"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import type { OrderState } from "@/store/BTOrders/types";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type PutCallData = {
  put: OrderState;
  call: OrderState;
};

// Custom Cell renderer for Call Delta

function handleUpdateLegs(event, cell, row, addLegs, removeAllLegs) {
  const buy_type = cell.id.includes("bid") ? "bid" : "ask";
  const option_type = cell.id.includes("call") ? "call" : "put";

  if (event.ctrlKey) {
    if (cell.id.includes("bid") || cell.id.includes("ask")) {
      addLegs({
        buy_type: buy_type,
        option_type: option_type === "call" ? true : false,
        price:
          buy_type === "bid"
            ? -1 * row.original[option_type][buy_type]
            : row.original[option_type][buy_type],
        strike: row.original[option_type]["strike"],
        quote_datetime: row.original[option_type]["quote_datetime"],
        expiration: row.original[option_type]["expiration"],
      });
    }
  } else if (cell.id.includes("bid") || cell.id.includes("ask")) {
    removeAllLegs();
    addLegs({
      buy_type: buy_type,
      option_type: option_type === "call" ? true : false,
      price:
        buy_type === "bid"
          ? -1 * row.original[option_type][buy_type]
          : row.original[option_type][buy_type],
      strike: row.original[option_type]["strike"],
      quote_datetime: row.original[option_type]["quote_datetime"],
      expiration: row.original[option_type]["expiration"],
    });
  }
}
const renderCallITM = ({ cell, row }) => {
  const cellStyle =
    row.original.call.delta > 0.5 ? { backgroundColor: "lightblue" } : {};
  return (
    <div className="text-center" style={cellStyle}>
      {cell.getValue()}
    </div>
  );
};

// Custom Cell renderer for Put Delta
const renderPutITM = ({ cell, row }) => {
  const cellStyle =
    row.original.call.delta <= 0.5 ? { backgroundColor: "lightblue" } : {};
  return (
    <div className="text-center" style={cellStyle}>
      {cell.getValue()}
    </div>
  );
};

const columnHelper = createColumnHelper<PutCallData>();

export const columns: ColumnDef<PutCallData>[] = [
  columnHelper.group({
    id: "CALL",
    header: () => <span>CALL</span>,
    columns: [
      columnHelper.accessor("call.gamma", {
        header: () => <span>Gamma</span>,
        cell: renderCallITM,
      }),
      columnHelper.accessor("call.delta", {
        header: () => <span>Delta</span>,
        cell: renderCallITM,
      }),
      columnHelper.accessor("call.bid", {
        header: () => <span>Bid</span>,
        cell: renderCallITM,
      }),
      columnHelper.accessor("call.ask", {
        header: () => <span>Ask</span>,
        cell: renderCallITM,
      }),
    ],
  }),
  {
    header: "Expiration",
    accessorKey: "call.expiration",
    getGroupingValue: (row) => `${row.call.expiration}`,
    //optionally, customize the cell render when this column is grouped. Make the text blue and pluralize the word
    // minSize: 50, //max size enforced during resizing
    // maxSize: 50,
  },
  {
    accessorKey: "call.strike", //access nested data with dot notation
    header: "Strike Price",
    minSize: 100,
  },

  columnHelper.group({
    id: "PUT",
    header: () => <span>PUT</span>,
    columns: [
      columnHelper.accessor("put.gamma", {
        header: () => <span>Gamma</span>,
        cell: renderPutITM,
      }),
      columnHelper.accessor("put.delta", {
        header: () => <span>Delta</span>,
        cell: renderPutITM,
      }),
      columnHelper.accessor("put.bid", {
        header: () => <span>Bid</span>,
        cell: renderPutITM,
      }),
      columnHelper.accessor("put.ask", {
        header: () => <span>Ask</span>,
        cell: renderPutITM,
      }),
    ],
  }),
];
