import React from "react";

// ** 볼린저밴더
// 표준편차

export const bollingerCal = (
  stockArray: any[] = [],
  clo20Array: number[] = []
) => {
  let dummyLength = 0;
  const standardDeviation: number[] = [];
  const bolUp = () => {
    const clo20ArrayBol: number[][] = [];
    const clo20Average: number[] = [];
    const gap: number[][] = [];
    const variance: number[] = [];

    for (let i = 0; i < stockArray.length; i++) {
      const a = clo20Array.slice(i, i + 20);

      if (a.length > 19) {
        clo20ArrayBol.push(a);
      } else {
        clo20ArrayBol.push([
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]);
      }
      // [0000000] 이걸 넣은 이유는 데이터가 부족하기 때문이다.
      clo20Average.push(clo20ArrayBol[i].reduce((a, b) => a + b) / 20);
    }
    const calculate = () => {
      gap.push();
      for (let i = 0; i < stockArray.length; i++) {
        gap.push(
          clo20ArrayBol[i].map((item) => Math.abs(item - clo20Average[i]) ** 2)
        );
        variance.push(gap[i].reduce((a, b) => a + b) / 19);
        // 편의상 round로 반올림 시키겠다.
        standardDeviation.push(Math.round(Math.sqrt(variance[i])));
      }
    };
    calculate();
    // *************************************************
    // ** 아래 for 문은 나중에 real data 를 이용하면 삭제해도 되는 부분!!!
    // *************************************************
    for (let i = 0; i < standardDeviation.length; i++) {
      if (standardDeviation[i] === 0) {
        standardDeviation.splice(i, 1);
        dummyLength++;
        i--;
      }
    }
    for (let i = 0; i < dummyLength; i++) {
      standardDeviation.unshift(0);
    }
    // *************************************************
    // *************************************************
  };

  bolUp();
  const dummyClo20Array: number[] = [];

  const bollingerArray: number[][] = [];
  const caculateBol = () => {
    // *************************************************
    // ** 아래 for 문은 나중에 real data 를 이용하면 삭제해도 되는 부분!!!
    // *************************************************
    for (let i = 0; i < clo20Array.length - 19; i++) {
      dummyClo20Array.push(clo20Array[i + 19]);
    }
    for (let i = 0; i < dummyLength; i++) {
      dummyClo20Array.unshift(0);
    }
    // *************************************************
    // *************************************************
    for (let i = 0; i < clo20Array.length; i++) {
      bollingerArray.push([
        dummyClo20Array[i] + standardDeviation[i] * 2,
        dummyClo20Array[i] - standardDeviation[i] * 2,
      ]);
    }
  };
  caculateBol();
  return bollingerArray;
};
