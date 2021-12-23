import MilBilCal from "../../functions/milBilCal";

type Props = {
  data: any;
};

const CoinSliderCard: React.FC<Props> = ({ data }) => {
  return (
    <div className=" bg-white  rounded-lg my-5 mx-10 min-w-full">
      <div className=" flex flex-row items-center justify-between px-3 pt-3">
        <div className=" flex flex-row items-center">
          <img src={data.iconUrl} className=" w-8 h-8" />
          <h3 className=" font-bold">{data.symbol}</h3>
        </div>
        <div
          className={
            data.change > 0
              ? " bg-green-400 rounded-md px-1"
              : "bg-red-400 rounded-md px-1"
          }
        >
          <h3 className=" font-bold text-white text-sm">{data.change + "%"}</h3>
        </div>
      </div>

      <div className=" p-3 flex flex-col">
        <h3 className=" font-bold text-lg">
          {parseFloat(data.price) < 100
            ? parseFloat(data.price).toLocaleString(undefined, {
                maximumFractionDigits: 4,
              }) +
              " " +
              "$"
            : parseFloat(data.price).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              }) +
              " " +
              "$"}
        </h3>
        <h3 className=" text-sm text-gray-500 py-2">
          {"24H Turnover" + " " + MilBilCal(data.volume) + "[USD]"}
        </h3>
      </div>
      <div className=" h-80">
        <hr className=" bg-black" />
        <h3 className=" font-bold text-lg pl-5 pr-16 py-5">Description</h3>
        <div className="flex flex-row">
          <h3
            className=" font-bold text-sm pl-5 pr-16 py-5"
            dangerouslySetInnerHTML={{
              __html: data.description.substr(0, 800),
            }}
          ></h3>
        </div>
      </div>
    </div>
  );
};

export default CoinSliderCard;
