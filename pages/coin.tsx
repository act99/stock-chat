import { useState } from "react";
import { useSelector } from "react-redux";
import { CoinList } from "../components/list/coinList";
import Chat from "../containers/chat/chat";
import { CoinChart } from "../containers/coin/coinchart";
import Test from "../containers/coin/test";
import { CoinColumns } from "../etc/coinColumns";
import { useWindowSize } from "../hooks/usewindowsize";
import { CommonRootState } from "../store/app/store";
import { useGetCryptosQuery } from "../store/services/cryptoApi";

interface Size {
  width: number | undefined;
  height: number | undefined;
}

export const Coin = ({}) => {
  const { data, isLoading, error } = useGetCryptosQuery("coins");
  const selectedList = useSelector(
    (state: CommonRootState) => state.CoinSelectBtnClick.coinSelected
  );
  const refinedData = data?.data.coins;

  const size: Size = useWindowSize();
  return (
    <>
      <div className=" relative">
        <div className=" absolute">
          {selectedList == true ? (
            <>
              <div>
                <CoinList
                  columns={CoinColumns}
                  data={refinedData}
                  onClick={selectedList}
                />
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
        <div className="bg-chartGray-default flex-col flex w-screen h-auto">
          <Test />
          <div className="flex flex-row">
            <CoinChart
              width={size.width == undefined ? undefined : size.width * 1}
              height={size.height}
            />
            <Chat
              width={size.width == undefined ? undefined : size.width * 0.2}
              height={size.height}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Coin;
