import React from "react";

const aveCal = (close: number[], length: number) => {
  const cloXArray: [number, number][] = [];
  const calClo20: number[] = [];
  for (let i = 0; i < close.length; i++) {
    calClo20.push(
      close.slice(i, i + length).reduce((a: number, b: number) => a + b) /
        length
    );
  }
  for (let i = 0; i < close.length; i++) {
    cloXArray.push([calClo20[i], calClo20[i + 1]]);
  }
  cloXArray.length > length
    ? (cloXArray.length = cloXArray.length - length)
    : null;
  for (let i = 0; i < length; i++) {
    cloXArray.unshift([0, 0]);
  }
  //   console.log(cloXArray);
  return cloXArray;
};

export const aveCal20Num = (close: number[], length: number) => {
  const calClo20: number[] = [];
  for (let i = 0; i < close.length; i++) {
    calClo20.push(
      close.slice(i, i + length).reduce((a: number, b: number) => a + b) /
        length
    );
  }
  return calClo20;
};

export default aveCal;
