import { useGetStocksQuery } from "../store/services/stockApi";
import axios from "axios";
const Test = () => {
  const onClick = () => {
    axios.get("http://localhost:8000/getdata").then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <button onClick={onClick}>Get Data from Server</button>
    </div>
  );
};

export default Test;
