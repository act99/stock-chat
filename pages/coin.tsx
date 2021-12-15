import Chat from "../containers/chat/chat";
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
      <div className="flex flex-row">
        <CoinChart
          width={size.width == undefined ? undefined : size.width * 1}
          height={size.height}
        />
        <Chat
          width={size.width == undefined ? undefined : size.width * 0.2}
          height={size.height}
        />
      </div>
    </div>
  );
};
export default Coin;
