import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalFilter, useTable } from "react-table";
import { CoinList } from "../../components/list/coinList";
import LoadingComponent from "../../components/loading/loading";
import { CoinTable } from "./coinTable";
import MilBilCal from "../../functions/milBilCal";
import { CommonRootState } from "../../store/app/store";
import { useGetCryptosQuery } from "../../store/services/cryptoApi";
import { selectedCoin } from "../../store/services/coinSlice";

interface Props {
  onClick: boolean;
}

interface ColumnProps {
  value: string;
}

const Test: React.FC<Props> = ({ onClick }) => {
  const columns = [
    {
      accessor: "iconUrl",
      Cell: ({ value }: ColumnProps) => (
        <div className=" flex justify-end">
          <img src={value} className=" w-5 h-5" />
        </div>
      ),
    },
    {
      accessor: "symbol",
      Cell: ({ value }: ColumnProps) => <h3>{value}</h3>,
    },
    {
      accessor: "price",
      Cell: ({ value }: ColumnProps) => (
        <div className=" flex justify-end">
          <h3>
            {parseFloat(value) < 100
              ? parseFloat(value).toLocaleString(undefined, {
                  maximumFractionDigits: 4,
                }) +
                " " +
                "$"
              : parseFloat(value).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                }) +
                " " +
                "$"}
          </h3>
        </div>
      ),
    },
    {
      accessor: "change",
      Cell: ({ value }: ColumnProps) => (
        <div className=" flex justify-end">
          <h3
            className={
              parseFloat(value) < 0 ? "text-red-600" : "text-green-500"
            }
          >
            {value + " " + "%"}
          </h3>
        </div>
      ),
    },
    {
      accessor: "volume",
      Cell: ({ value }: ColumnProps) => (
        <div className=" flex justify-end">
          <h3>{MilBilCal(parseFloat(value)) + ["[USD]"]}</h3>
        </div>
      ),
    },
  ];

  const { data, isLoading, error } = useGetCryptosQuery("coins");
  const value = useSelector(
    (state: CommonRootState) => state.selectedCoin.coin
  );
  const dispatch = useDispatch();
  const refinedData = data?.data.coins;
  const handleChange = (e: any) => {
    console.log(e.target.value);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }
  return onClick == true ? (
    <>
      <div>
        <CoinList columns={columns} data={refinedData} onClick={onClick} />
      </div>
    </>
  ) : (
    <div></div>
  );
};

export default Test;
