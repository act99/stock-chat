import { useEffect, useState } from "react";
import CoinSliderCard from "../../components/slider/coinSliderCard";
import useInterval from "../../hooks/useInterval";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

type Props = {
  data: any;
};

const HomeSlider: React.FC<Props> = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

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

  console.log(changeDescData().length);

  useInterval(() => {
    if (paused === false) {
      currentSlide === changeDescData().length - 1
        ? setCurrentSlide(0)
        : setCurrentSlide(currentSlide + 1);
    }
  }, 5000);

  console.log(currentSlide);

  const nextSlide = () => {
    if (currentSlide === changeDescData().length - 1) {
      setCurrentSlide(0);
    } else setCurrentSlide(currentSlide + 1);
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(changeDescData().length - 1);
    } else setCurrentSlide(currentSlide - 1);
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
  console.log(changeDescData()[currentSlide]);
  //   console.log(changeDescData()[0]);
  return (
    <div className=" w-10/12">
      <h3 className=" font-bold text-2xl pl-5 pr-16 py-5">
        Today Cryptos Transcation Price
      </h3>
      <div
        className="flex flex-row w-10/12 items-center"
        onMouseLeave={() => {
          setPaused(false);
        }}
        onMouseEnter={() => {
          setPaused(true);
        }}
      >
        <button onClick={prevSlide}>
          <FiArrowLeft color="#f7a600" size={"24"} />
        </button>
        <CoinSliderCard data={changeDescData()[currentSlide]} />
        <button onClick={nextSlide}>
          {" "}
          <FiArrowRight color="#f7a600" size={"24"} />
        </button>
      </div>
    </div>
  );
};

export default HomeSlider;
