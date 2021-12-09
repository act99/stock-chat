import { scaleLinear } from "d3-scale";
import React from "react";
import aveCal, { aveCal20Num } from "../../functions/ave-cal";
import { bollingerCal } from "../../functions/bol-cal";
import { dataToArray } from "../../functions/data-to-array";
import { useGetCryptoCompareHistoryQuery } from "../../store/services/cryptoApi";
type CandleProps = {
  width: number | undefined;
  height: number | undefined;
  defaultLimit: number | undefined;
  dataLength: number | undefined;
  name: string | undefined;

  // clo5: number[];
  // clo20: number[];
  // clo60: number[];
  // bollinger: number[][];
};

export const CoinCandle: React.FC<CandleProps> = ({
  width,
  height,
  defaultLimit,
  dataLength,
  name,

  // clo5,
  // clo20,
  // clo60,
  // bollinger,
}) => {
  //***Get data */
  const { data, isLoading, error } = useGetCryptoCompareHistoryQuery({
    limit: defaultLimit,
    coin: name,
  });

  const coinDataArray: any[] | undefined = [];
  const readingData = async () => {
    return !isLoading ? coinDataArray.push(data.Data.Data) : null;
  };
  readingData();
  const coinDummyArray = coinDataArray[0];

  const coinArray: any[] = [];
  coinDummyArray
    ?.slice(dataLength, coinDummyArray.length)
    .forEach((item: any) => coinArray.push(Object.values(item)));

  const date = dataToArray(coinArray, 0);
  const open = dataToArray(coinArray, 3);
  const close = dataToArray(coinArray, 6);
  const high = dataToArray(coinArray, 1);
  const low = dataToArray(coinArray, 2);

  const bollinger: number[][] = bollingerCal(coinArray, aveCal20Num(close, 20));
  const bollingerUpper: number[][] = [];
  const bollingerLower: number[][] = [];
  for (let i = 0; i < bollinger.length; i++) {
    bollingerUpper.push([
      bollinger[i][0],
      bollinger[i + 1] == undefined ? bollinger[i][0] : bollinger[i + 1][0],
    ]);
    bollingerLower.push([
      bollinger[i][1],
      bollinger[i + 1] == undefined ? bollinger[i][1] : bollinger[i + 1][1],
    ]);
  }
  // 볼린저 밴드가 밀려서 사용함. (한번 손 대야 할듯)
  for (let i = 0; i < 10; i++) {
    bollingerUpper.unshift([0, 0]);
    bollingerLower.unshift([0, 0]);
  }

  //***Get data done*/

  let SVG_CHART_WIDTH = typeof width === "number" ? width * 1 : 0;
  let SVG_CHART_HEIGHT = typeof height === "number" ? height * 0.5 : 0;

  const xForPrice = 75;
  const xAxisLength = SVG_CHART_WIDTH - xForPrice;
  const yAxisLength = SVG_CHART_HEIGHT * 0.94;
  const x0 = 0;
  const y0 = 0;

  const dataArray: [
    number,
    number,
    number,
    number,
    number,
    number[],
    number[],
    number[],
    number[],
    number[]
  ][] = [];

  for (let i = 0; i < date.length; i++) {
    dataArray.push([
      date[i],
      open[i],
      close[i],
      high[i],
      low[i],
      aveCal(close, 5)[i],
      aveCal(close, 20)[i],
      aveCal(close, 60)[i],
      bollingerUpper[i],
      bollingerLower[i],
    ]);
  }

  const dataYMax = dataArray.reduce(
    (
      max,
      [
        _,
        open,
        close,
        high,
        low,
        clo5,
        clo20,
        clo60,
        bollingerUpper,
        bollingerLower,
      ]
    ) => Math.max(max, high),
    -Infinity
  );
  const dataYMin = dataArray.reduce(
    (
      min,
      [
        _,
        open,
        close,
        high,
        low,
        clo5,
        clo20,
        clo60,
        bollingerUpper,
        bollingerLower,
      ]
    ) => Math.min(min, low),
    +Infinity
  );

  const dataYRange = dataYMax - dataYMin;
  const numYTicks = 7;
  const barPlothWidth = xAxisLength / dataArray.length;

  const numXTicks = 12;

  const xValue: number[] = [];
  const generateDate = () => {
    for (let i = 0; i < 12; i++) {
      xValue.push(date[Math.round(date.length / 12) * i]);
    }
    // xValue.reverse();
    return xValue;
  };
  generateDate();
  return (
    <div>
      <svg width={SVG_CHART_WIDTH} height={SVG_CHART_HEIGHT}>
        <line
          x1={x0}
          y1={yAxisLength}
          x2={xAxisLength}
          y2={yAxisLength}
          stroke="gray"
        />
        <line
          x1={xAxisLength}
          y1={y0}
          x2={xAxisLength}
          y2={yAxisLength}
          stroke="gray"
        />
        <text
          x={x0 + 15}
          y={y0 + yAxisLength * 0.06}
          fontSize={
            SVG_CHART_WIDTH > 700
              ? SVG_CHART_WIDTH * 0.01
              : SVG_CHART_WIDTH * 0.02
          }
        >
          {name}
        </text>
        {/* 세로선 작성 */}
        {Array.from({ length: numXTicks }).map((_, index) => {
          const x = x0 + index * (xAxisLength / numXTicks) + 10;

          return (
            <g key={index}>
              <line
                className="lineLight"
                x1={x}
                x2={x}
                y1={yAxisLength}
                y2={y0}
              ></line>
              <text
                x={x}
                y={SVG_CHART_HEIGHT}
                textAnchor="middle"
                fontSize={SVG_CHART_WIDTH < 800 ? 6 : 10}
              >
                {xValue[index]}
              </text>
            </g>
          );
        })}
        {/* 가로선 작성(css name => lineLight) */}
        {Array.from({ length: numYTicks }).map((_, index) => {
          const y = y0 + index * (yAxisLength / numYTicks);
          const yValue = Math.round(
            dataYMax - index * (dataYRange / numYTicks)
          );
          return (
            <g key={index}>
              <line
                className="lineLight"
                x1={xAxisLength}
                x2={x0}
                y1={y}
                y2={y}
              ></line>
              <text x={SVG_CHART_WIDTH - 60} y={y + 10} fontSize="12">
                {yValue.toLocaleString()} $
              </text>
            </g>
          );
        })}
        {/* 캔들 구현 */}
        {dataArray.map(
          (
            [
              day,
              open,
              close,
              high,
              low,
              //************************** */
              clo5,
              clo20,
              clo60,
              bolUpper,
              bolLower,
              //************************** */
            ],
            index
          ) => {
            // 캔들 & 이동평균선
            const x = x0 + index * barPlothWidth;
            const xX = x0 + (index + 1) * barPlothWidth;
            const sidePadding = xAxisLength * 0.0015;
            const max = Math.max(open, close);
            const min = Math.min(open, close);
            // ** 여기도 나중에 real data가 오면 필요 없음
            // const bolGap =
            //********
            const scaleY = scaleLinear()
              .domain([dataYMin, dataYMax])
              .range([y0, yAxisLength]);
            const fill = close > open ? "#4AFA9A" : "#E33F64";

            return (
              <g key={index}>
                {/* 선행스팬 후행스팬 구름형성에 필요한 빗금 */}
                //************************** */
                {bolUpper[0] != bolUpper[1] && bollingerUpper[index][0] != 0 ? (
                  <line
                    stroke="blue"
                    x1={x + (barPlothWidth - sidePadding) / 2}
                    x2={xX + (barPlothWidth - sidePadding) / 2}
                    y1={yAxisLength - scaleY(bolUpper[0])}
                    y2={yAxisLength - scaleY(bolUpper[1])}
                  />
                ) : null}
                {bolLower[0] != bolLower[1] && bollingerUpper[index][0] != 0 ? (
                  <line
                    stroke="blue"
                    x1={x + (barPlothWidth - sidePadding) / 2}
                    x2={xX + (barPlothWidth - sidePadding) / 2}
                    y1={yAxisLength - scaleY(bolLower[0])}
                    y2={yAxisLength - scaleY(bolLower[1])}
                  />
                ) : null}
                {bolLower[0] != bolLower[1] && bollingerUpper[index][0] != 0 ? (
                  <line
                    stroke="blue"
                    x1={x + (barPlothWidth - sidePadding)}
                    x2={x + (barPlothWidth - sidePadding)}
                    y1={
                      scaleY(bolUpper[0]) < scaleY(bolUpper[1])
                        ? yAxisLength - scaleY(bolUpper[0])
                        : yAxisLength - scaleY(bolUpper[1])
                    }
                    y2={
                      scaleY(bolLower[0]) < scaleY(bolLower[1])
                        ? yAxisLength - scaleY(bolLower[1])
                        : yAxisLength - scaleY(bolLower[0])
                    }
                    // y2={yAxisLength - scaleY(bolLower[1])}
                  />
                ) : null}
                //************************** */
                <line
                  x1={x + (barPlothWidth - sidePadding) / 2}
                  x2={x + (barPlothWidth - sidePadding) / 2}
                  y1={yAxisLength - scaleY(low)}
                  y2={yAxisLength - scaleY(high)}
                  stroke={open > close ? "red" : "green"}
                />
                <rect
                  {...{ fill }}
                  x={x}
                  width={barPlothWidth - sidePadding}
                  y={yAxisLength - scaleY(max)}
                  // 시가 종가 최대 최소값의 차
                  height={scaleY(max) - scaleY(min)}
                ></rect>
                <line
                  stroke="red"
                  x1={x + (barPlothWidth - sidePadding) / 2}
                  x2={xX + (barPlothWidth - sidePadding) / 2}
                  y1={yAxisLength - scaleY(clo20[0])}
                  y2={yAxisLength - scaleY(clo20[1])}
                />
                <line
                  stroke="green"
                  x1={x + (barPlothWidth - sidePadding) / 2}
                  x2={xX + (barPlothWidth - sidePadding) / 2}
                  y1={yAxisLength - scaleY(clo5[0])}
                  y2={yAxisLength - scaleY(clo5[1])}
                />
                <line
                  stroke="gold"
                  x1={x + (barPlothWidth - sidePadding) / 2}
                  x2={xX + (barPlothWidth - sidePadding) / 2}
                  y1={yAxisLength - scaleY(clo60[0])}
                  y2={yAxisLength - scaleY(clo60[1])}
                />
                )
              </g>
            );
          }
        )}
      </svg>
    </div>
  );
};
