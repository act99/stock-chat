import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { bollingerCal } from "../../functions/bol-cal";
import { STOCK_QUERY } from "../../gql-query/stock-query";
import { dataToArray } from "../../functions/data-to-array";
import { frontStockQuery } from "../../__generated__/frontStockQuery";
import { StockCandle } from "../../components/stock/stock_candle";
import { StockVolume } from "../../components/stock/stock_volume";

type Props = {
  width: number | undefined;
  height: number | undefined;
};

export const StockChart: React.FC<Props> = ({ width, height }) => {
  const { data, loading } = useQuery<frontStockQuery>(STOCK_QUERY, {
    variables: {},
  });

  // const count = useSelector((state: RootState) => state.counter.count);
  // const dispatch = useDispatch();
  // const onIncrease = () => {
  //   dispatch(increase());
  // };
  // const onDecrease = () => {
  //   dispatch(decrease);
  // };
  // const onIncreaseBy = (diff: number) => {
  //   dispatch(increaseBy(diff));
  // };

  const [dataLength, setDataLength] = useState(24);

  // 데이터 가져와서 array 처리
  // stockArray 값을 onWheel로 추가 삭제할 예정
  // dataDefaultMinusLength => 임시데이터를 사용하기 때문에 데이터 부족으로 구현한 숫자
  const dataDefaultMinusLength = 18;
  const stockData = data?.gsStock.map((item) => item);
  const stockDummyArray: any[] | undefined = [];
  stockData?.forEach((item) => stockDummyArray.push(item));

  // 이 작업도 역시 실시간 데이터가 충분하면 안해도 됨
  const stockArray: any[] | undefined = [];
  stockData
    ?.slice(dataLength, stockDummyArray.length)
    .forEach((item) => stockArray.push(Object.values(item)));

  const dataWheelHandler = () => {
    window.onwheel = function (e) {
      e.deltaY > 0
        ? setDataLength(
            dataLength < dataDefaultMinusLength
              ? dataLength + 0
              : dataLength - 8
          )
        : setDataLength(
            dataLength > stockDummyArray?.length - dataDefaultMinusLength
              ? dataLength + 0
              : dataLength + 8
          );
    };
  };

  return (
    <div onWheel={dataWheelHandler}>
      <StockCandle
        width={width}
        height={height}
        date={dataToArray(stockArray, 2)}
        name={dataToArray(stockArray, 5)}
        close={dataToArray(stockArray, 7)}
        open={dataToArray(stockArray, 8)}
        high={dataToArray(stockArray, 9)}
        low={dataToArray(stockArray, 10)}
        clo5={dataToArray(stockArray, 12)}
        clo20={dataToArray(stockArray, 14)}
        clo60={dataToArray(stockArray, 16)}
        bollinger={bollingerCal(stockArray, dataToArray(stockArray, 14))}
      />
      <StockVolume
        width={width}
        height={height}
        date={dataToArray(stockArray, 2)}
        close={dataToArray(stockArray, 7)}
        open={dataToArray(stockArray, 8)}
        volume={dataToArray(stockArray, 11)}
      />
      {/* <Counter
        count={count}
        onDecrease={onDecrease}
        onIncrease={onIncrease}
        onIncreaseBy={onIncreaseBy}
      /> */}
    </div>
  );
};
