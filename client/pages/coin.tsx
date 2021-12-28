import { useState } from "react";
import { useSelector } from "react-redux";
import { CoinList } from "../components/list/coinList";
import Chat from "../containers/chat/chat";
import RealtimeChat from "../containers/chat/realtimeChat";
import { CoinChart } from "../containers/coin/coinchart";
import CoinListTable from "../containers/coin/coinListTable";
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
      <div className="  fixed">
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
        <div className="bg-chartGray-default flex-col flex w-screen  h-screen overflow-hidden ">
          <CoinListTable />
          <div className="flex flex-row">
            <CoinChart
              width={size.width == undefined ? undefined : size.width * 1}
              height={size.height}
            />
            <Chat />
            <RealtimeChat />
          </div>
        </div>
      </div>
    </>
  );
};
export default Coin;
