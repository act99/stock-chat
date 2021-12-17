import { useDispatch, useSelector } from "react-redux";
import { CommonRootState } from "../store/app/store";
import { increasement } from "../store/services/exercise";

const Test = () => {
  const count = useSelector((state: CommonRootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col justify-center items-center">
      <button onClick={() => dispatch(increasement())}>Increase</button>
      <h3>{count}</h3>
    </div>
  );
};

export default Test;
