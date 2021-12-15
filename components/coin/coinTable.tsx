import React, { useState } from "react";
import { useAsyncDebounce, useGlobalFilter, useTable } from "react-table";

type Props = {
  columns: any;
  data: any;
};

export const CoinTable: React.FC<Props> = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useGlobalFilter
    );
  return (
    <>
      <table
        {...getTableProps()}
        style={{
          // border: "1",
          borderWidth: "1px",
          borderColor: "#000000",
          borderStyle: "solid",
          textAlign: "center",
        }}
      >
        <thead>
          {headerGroups.map((headerGroups) => (
            <tr {...headerGroups.getHeaderGroupProps()}>
              {headerGroups.headers.map((columns) => (
                <th {...columns.getHeaderProps()}>
                  {columns.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
