import React, { useEffect, useState } from "react";
import { StockChart } from "../containers/stock/stockchart";
import { useWindowSize } from "../hooks/usewindowsize";

interface Size {
  width: number | undefined;
  height: number | undefined;
}

const Stock = () => {
  const size: Size = useWindowSize();
  // console.log(size.width, size.height);

  return (
    <div className=" bg-chartGray-default flex-col flex">
      <div>
        <StockChart width={size.width} height={size.height} />
      </div>
    </div>
  );
};

export default Stock;
