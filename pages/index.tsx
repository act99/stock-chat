import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { CoinTable } from "../components/coin/coinTable";
import LoadingComponent from "../components/loading/loading";
import { useGetCryptosQuery } from "../store/services/cryptoApi";

type ColumnProps = {
  value: string;
};

const Home: NextPage = () => {
  const { data, isLoading, error } = useGetCryptosQuery("coins");
  const globalStats = data?.data?.stats;

  const columns = [
    {
      Header: "",
      accessor: "iconUrl",
      Cell: ({ value }: ColumnProps) => (
        <img src={value} width={30} height={30} />
      ),
    },
    {
      Header: "name",
      accessor: "name",
    },
    {
      Header: "change",
      accessor: "change",
    },
    {
      Header: "price",
      accessor: "price",
    },
    {
      Header: "symbol",
      accessor: "symbol",
    },
    {
      Header: "volume",
      accessor: "volume",
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
        <CoinTable columns={columns} data={tableData} />
      </div>
    </div>
  );
};

export default Home;
