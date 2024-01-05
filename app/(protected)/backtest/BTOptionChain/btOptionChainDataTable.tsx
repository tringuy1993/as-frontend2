"use client";

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

import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [expanded, setExpanded] = useState({});
  useEffect(() => {
    if (data && data.length > 0) {
      const firstGroupKey = `call_expiration:${data[0].call.expiration}`;
      setExpanded({
        [firstGroupKey]: true,
      });
    }
  }, [data]);

  const [grouping, setGrouping] = useState(["call_expiration"]);

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    state: { grouping, expanded },
    onExpandedChange: setExpanded,

    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),

    // debugTable: true,
  });

  const { rows } = table.getRowModel();

  const tableContainerRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 35,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  return (
    <div className="overflow-auto relative" style={{ height: "800px" }}>
      <Table ref={tableContainerRef}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className="text-center"
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {/* {header.column.id === "call_expiration" && (
                          <button
                            onClick={header.column.getToggleGroupingHandler()}
                            style={{ cursor: "pointer" }}
                          >
                            {header.column.getIsGrouped() ? "🛑 " : "👊 "}
                          </button>
                        )} */}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
            width: "100%",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = table.getRowModel().rows[virtualRow.index];
            if (row.getIsGrouped()) {
              return (
                // Render the group cell and an expander button
                <TableRow
                  data-state={row.getIsSelected() && "selected"}
                  key={row.id}
                >
                  <TableCell
                    colSpan={columns.length}
                    className="flex items-start text-center"
                  >
                    <Button
                      onClick={() => row.getToggleExpandedHandler()()}
                      // style={{ cursor: "pointer" }}
                      className="cursor-pointer"
                    >
                      {row.getIsExpanded() ? "👇" : "👉"}{" "}
                      {row.getValue("call_expiration")}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }
            return (
              <TableRow
                data-state={row.getIsSelected() && "selected"}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="text-center"
                    onClick={(e) => {
                      console.log(e);
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
