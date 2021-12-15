import React from "react";
import { ScaleLoader } from "react-spinners";

const LoadingComponent = () => (
  <div className="flex justify-center">
    <ScaleLoader height="160px" width="32px" color="#ff9900" radius="8px" />;
  </div>
);

export default LoadingComponent;
