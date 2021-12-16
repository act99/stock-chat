import { useState } from "react";
import CoinInfoCard from "../../components/coin/coinInfoCard";

type CoinHotProps = {
  data: any;
};

const CoinHot: React.FC<CoinHotProps> = ({ data }) => {
  const [number, setNumber] = useState(0);
  const changeDescData = () => {
    const dataArray: any[] = [];
    for (let i = 0; i < data?.length; i++) {
      dataArray.push(data[i]);
    }
    dataArray.sort(
      (a: any, b: any) => parseFloat(a.change) - parseFloat(b.change)
    );
    return dataArray;
  };
  const volumeDescData = () => {
    const dataArray: any[] = [];
    for (let i = 0; i < data?.length; i++) {
      dataArray.push(data[i]);
    }
    dataArray.sort(
      (a: any, b: any) => parseFloat(a.volume) - parseFloat(b.volume)
    );
    return dataArray;
  };

  return (
    <div className=" flex flex-col p-5 w-10/12">
      <h3 className=" py-5 text-3xl font-extrabold">Market Trends</h3>
      <div className=" flex flex-row">
        <CoinInfoCard
          data={volumeDescData()[volumeDescData().length - 1]}
          title="Highest 24H Turnover"
        />
        <CoinInfoCard data={volumeDescData()[0]} title="Lowest 24H Turnover" />
        <CoinInfoCard
          data={changeDescData()[changeDescData().length - 1]}
          title="Max 24H Change  %"
        />
        <CoinInfoCard data={changeDescData()[0]} title="Min 24H Change  %" />
      </div>
    </div>
  );
};

export default CoinHot;
