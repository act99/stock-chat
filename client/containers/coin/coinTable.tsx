import { range } from "lodash";
import React, { useState } from "react";
import { useGlobalFilter, usePagination, useTable } from "react-table";

type Props = {
  columns: any;
  data: any;
};

export const CoinTable: React.FC<Props> = ({ columns, data }) => {
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  }: // previousPage,
  // nextPage,
  // canPreviousPage,
  // canNextPage,
  any = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    usePagination
  );

  function Search({ onSubmit }: any) {
    const handleSubmit = (event: any) => {
      event.preventDefault();
      onSubmit(event.target.elements.filter.value);
    };

    return (
      <form className="py-5" onSubmit={handleSubmit}>
        <div className=" p-2 bg-white rounded-2xl">
          <input name="filter" placeholder={"  " + "Search"} className=" " />
        </div>
      </form>
    );
  }

  return (
    <>
      <div className=" flex flex-col p-5 w-10/12">
        <div className="flex flex-row justify-between">
          <h3 className=" py-5 text-3xl font-extrabold">Markets</h3>
          <Search onSubmit={setGlobalFilter} />
        </div>
        <table className=" " {...getTableProps()}>
          <thead className=" text-gray-400 text-left  bg-gray-300 h-14 p-5">
            {headerGroups.map((headerGroups: any) => (
              <tr {...headerGroups.getHeaderGroupProps()}>
                {headerGroups.headers.map((columns: any) => (
                  <th {...columns.getHeaderProps()}>
                    {columns.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableProps()}>
            {rows.map((row: any, i: number) => {
              prepareRow(row);
              // console.log(i);
              return (
                <tr
                  className={
                    i % 2 == 0 ? " bg-white  h-14 p-5" : " bg-gray-300 h-14 p-5"
                  }
                  {...row.getRowProps()}
                >
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
        <div className=" flex flex-row justify-evenly py-5">
          {/* <button
            className=" bg-yellow-500 px-10 py-3 rounded-2xl text-center font-bold"
            onClick={previousPage()}
            disabled={!canPreviousPage}
          >
            prev
          </button>
          <button
            className=" bg-yellow-500 px-10 py-3 rounded-2xl text-center font-bold"
            onClick={nextPage()}
            disabled={!canNextPage}
          >
            next
          </button> */}
        </div>
      </div>
    </>
  );
};

// const sliceData = (data: any, startLen: number, endLen: number) => {
//   const arr = [];
//   for (let i = startLen; i < endLen; i++) {
//     arr.push(data[i]);
//   }
//   return arr;
// };
