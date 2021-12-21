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
import { onCoinSelectBtnClicked } from "../../store/services/onClickSlice";

interface Props {
  // onClick: boolean;
}

interface ColumnProps {
  value: string;
}

const Test: React.FC<Props> = ({}) => {
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
  const selectedCoin = useSelector(
    (state: CommonRootState) => state.selectedCoin.coin
  );
  const selectedList = useSelector(
    (state: CommonRootState) => state.CoinSelectBtnClick.coinSelected
  );
  const dispatch = useDispatch();

  const refinedData = data?.data.coins;
  const handleChange = (e: any) => {
    console.log(e.target.value);
  };
  const handleClick = () => {
    selectedList == true
      ? dispatch(onCoinSelectBtnClicked(false))
      : dispatch(onCoinSelectBtnClicked(true));
  };
  console.log(refinedData);
  // console.log(refinedData[0]);
  const handleCoinData = (selectedCoin: string) => {
    for (let i = 0; i < refinedData.length; i++) {
      if (refinedData[i].symbol == selectedCoin) {
        return refinedData[i];
      }
    }
  };
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className=" flex flex-row items-center  text-xs">
      <button onClick={handleClick} className=" ml-3 p-2 text-white text-left">
        <div className=" flex flex-row">
          <img
            src={handleCoinData(selectedCoin).iconUrl}
            width={35}
            height={35}
          ></img>
          <div className=" flex flex-col ml-3">
            <h3 className=" font-bold text-lg">
              {handleCoinData(selectedCoin).symbol}
            </h3>
            <h3 className=" text-sm">USD Trading</h3>
          </div>
        </div>
      </button>
      <h3
        className={
          handleCoinData(selectedCoin).change > 0
            ? "text-green-500 text-lg"
            : "text-red-500 text-lg"
        }
      >
        {parseFloat(handleCoinData(selectedCoin).price).toLocaleString() +
          "$" +
          " " +
          "[USD]"}
      </h3>
      <div className=" flex flex-col ml-5 text-white text-xs">
        <h3>24H Change %</h3>
        <h3
          className={
            handleCoinData(selectedCoin).change > 0
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {handleCoinData(selectedCoin).change + "%"}
        </h3>
      </div>
      <div className=" flex flex-col ml-10 text-white ">
        <h3>24H Turnover [USD]</h3>
        <h3>{handleCoinData(selectedCoin).volume.toLocaleString()}</h3>
      </div>
      <div className=" flex flex-col ml-5 text-white ">
        <h3>24H Turnover [USD]</h3>
        <h3>{handleCoinData(selectedCoin).volume.toLocaleString()}</h3>
      </div>
      <div className=" flex flex-col ml-5 text-yellow-500 ">
        <h3>Total Supply</h3>
        <h3 className=" text-white">
          {MilBilCal(handleCoinData(selectedCoin).totalSupply)}
        </h3>
      </div>
    </div>
  );
};

export default Test;
