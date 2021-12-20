import React, { useRef, useState } from "react";
import { useGlobalFilter, useTable } from "react-table";

type Props = {
  columns: any;
  data: any;
  onClick: any;
};

export const CoinList: React.FC<Props> = ({ columns, data, onClick }) => {
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  }: any = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter
  );

  function Search({ onSubmit }: any) {
    const handleSubmit = (event: any) => {
      event.preventDefault();
      onSubmit(event.target.elements.filter.value);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className=" ">
          <input
            name="filter"
            placeholder={"  " + "Search"}
            className=" p-1 bg-chartGray-default border-2 text-white w-full "
          />
        </div>
      </form>
    );
  }

  return (
    <>
      <div
        className={
          " flex flex-col p-5 w-128 transition-opacity ease-in delay-500 h-192 overflow-y-scroll"
          //   onClick == true
          //     ? " flex flex-col p-5 w-128  transition-opacity ease-in delay-500"
          //     : "flex flex-col p-5 w-128  transition-opacity opacity-30 ease-out delay-500"
        }
      >
        <Search onSubmit={setGlobalFilter} />
        <table className=" " {...getTableProps()}>
          <thead className=" text-gray-100 text-right h-14 p-5 text-xs">
            <tr>
              <th className=" text-right">Cont.</th>
              <th></th>
              <th>Price</th>
              <th>Change</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody {...getTableProps()}>
            {rows.map((row: any, i: number) => {
              prepareRow(row);
              // console.log(i);
              return (
                <tr className="h-14 p-5 text-white" {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className=" flex flex-row justify-evenly py-5"></div>
      </div>
      )
    </>
  );
};
