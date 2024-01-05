const order_columns = [
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
  },
];
