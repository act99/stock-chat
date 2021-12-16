import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { CoinTable } from "../containers/coin/coinTable";
import LoadingComponent from "../components/loading/loading";
import { useGetCryptosQuery } from "../store/services/cryptoApi";
import CoinHot from "../containers/coin/coinHot";
import MilBilCal from "../functions/milBilCal";
import Slider from "../components/slider/slider";

type ColumnProps = {
  value: string;
};

const Home: NextPage = () => {
  const { data, isLoading, error } = useGetCryptosQuery("coins");
  const globalStats = data?.data?.stats;

  const columns = [
    {
      // Header: "name",
      accessor: "iconUrl",

      Cell: ({ value }: ColumnProps) => (
        <div className=" flex justify-end">
          <img src={value} className=" w-5 h-5" />
        </div>
      ),
    },
    {
      Header: () => (
        <div className=" flex justify-start">
          <h3>Trading Pairs</h3>
        </div>
      ),
      accessor: "symbol",
      Cell: ({ value }: ColumnProps) => (
        <div className=" flex justify-start">
          <h3>{value}</h3>
        </div>
      ),
    },
    {
      Header: "Latest Traded Price",
      accessor: "price",
      Cell: ({ value }: ColumnProps) => (
        <div className=" flex justify-start">
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
      Header: "24H Change %",
      accessor: "change",
      Cell: ({ value }: ColumnProps) => (
        <div className=" flex justify-start">
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
    // {
    //   Header: "name",
    //   accessor: "name",
    // },
    {
      Header: "Trading Volume",
      accessor: "volume",
      Cell: ({ value }: ColumnProps) => (
        <div className=" flex justify-start">
          <h3>{parseFloat(value).toLocaleString()}</h3>
        </div>
      ),
    },
  ];

  const tableData = data?.data?.coins;
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div>
      <Head>Hi</Head>
      <div className="flex flex-col bg-gray-200">
        <div className=" flex flex-col  justify-center items-center">
          <Slider data={tableData} />
          <CoinHot data={tableData} />
          <CoinTable columns={columns} data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
