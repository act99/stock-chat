import { CoinChart } from "../containers/coin/coinchart";
import { useWindowSize } from "../hooks/usewindowsize";

interface Size {
  width: number | undefined;
  height: number | undefined;
}

export const Coin = ({}) => {
  const size: Size = useWindowSize();
  return (
    <div className="bg-chartGray-default flex-col flex">
      <CoinChart width={size.width} height={size.height} />
    </div>
  );
};
export default Coin;
