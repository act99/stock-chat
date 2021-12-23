import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../components/loading/loading";
import MilBilCal from "../../functions/milBilCal";
import { CommonRootState } from "../../store/app/store";
import { useGetCryptosQuery } from "../../store/services/cryptoApi";
import { onCoinSelectBtnClicked } from "../../store/services/onClickSlice";

interface Props {
  // onClick: boolean;
}

const CoinListTable: React.FC<Props> = ({}) => {
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
        <h3>24H Price [USD]</h3>
        <h3>{handleCoinData(selectedCoin).price.toLocaleString()}</h3>
      </div>
      <div className=" flex flex-col ml-5 text-white ">
        <h3>24H Turnover [USD]</h3>
        <h3>{handleCoinData(selectedCoin).volume.toLocaleString()}</h3>
      </div>
      <div className=" flex flex-col ml-5 text-white ">
        <h3>Number of Exchanges</h3>
        <h3>
          {handleCoinData(selectedCoin).numberOfExchanges.toLocaleString()}
        </h3>
      </div>
      <div className=" flex flex-col ml-5 text-white ">
        <h3>Ranking</h3>
        <h3>{handleCoinData(selectedCoin).rank.toLocaleString()}</h3>
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

export default CoinListTable;
