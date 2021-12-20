import { useState } from "react";
import { CoinCandle } from "../../components/coin/coin_candle";
import { CoinVolume } from "../../components/coin/coin_volume";
import RealtimeVolume from "../../components/coin/realtimeVolume";
import LoadingComponent from "../../components/loading/loading";
import { useGetCryptosQuery } from "../../store/services/cryptoApi";

type Props = {
  width: number | undefined;
  height: number | undefined;
};

export const CoinChart: React.FC<Props> = ({ width, height }) => {
  const { data, isLoading, error } = useGetCryptosQuery("coins");
  const selectData = data?.data?.coins;

  const [name, setName] = useState("LUNA");
  const [defaultLimit, setdefaultLimit] = useState(1000);
  const [dataLength, setDataLength] = useState(900);
  const dataDefaultMinusLength = 18;

  //** 마우스 휠 컨트롤러 */
  const dataWheelHandler = () => {
    window.onwheel = function (e) {
      e.deltaY > 0
        ? setDataLength(
            dataLength < dataDefaultMinusLength
              ? dataLength + 0
              : dataLength - 8
          )
        : setDataLength(
            dataLength > defaultLimit ? dataLength + 0 : dataLength + 8
          );
    };
  };
  const onClickListener = () => {
    setName("ETH");
  };
  console.log(height);

  // 추후 1000개 이상의 데이터를 필요로 할 경우 데이터 끌고오기 (아래)
  // setDataLength(
  //   dataLength >= defaultLimit ? defaultLimit + 500 : defaultLimit + 0
  // );
  // dataLength >
  if (isLoading) {
    return (
      <div className=" w-screen h-screen justify-center items-center">
        <LoadingComponent />
      </div>
    );
  }

  //** */ 데이터 배열 순서 : time, high, low, open, volumeFrom volumeTo, close
  return (
    <div onWheel={dataWheelHandler} style={{ width: 785 }}>
      <CoinCandle
        width={width}
        height={height}
        defaultLimit={defaultLimit}
        dataLength={dataLength}
        name={name}
      />
      <CoinVolume
        width={width}
        height={height}
        defaultLimit={defaultLimit}
        dataLength={dataLength}
        name={name}
      />
      <div className="flex flex-col justify-center items-center">
        <h3 className=" text-white">
          현재 받는 데이터가 매도량과 매수량이 없어서
        </h3>
        <h3 className=" text-white">거래량 색깔이 정확하지 않습니다.</h3>
        <h3 className=" text-white">양해 바랍니다.</h3>
      </div>
    </div>
  );
};
