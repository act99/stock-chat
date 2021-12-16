type Props = {
  data: any;
};

const Slider: React.FC<Props> = ({ data }) => {
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
  console.log(changeDescData()[0]);

  return (
    <div className=" bg-white max-w-full min-w-min p-3 opacity-5 transition-opacity"></div>
  );
};

export default Slider;
