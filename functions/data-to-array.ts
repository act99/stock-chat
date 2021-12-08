import React from "react";

export const dataToArray = (dataArray: any[], order: number) => {
  const resultArray: any[] = [];
  dataArray
    .map((item) => item[order])
    .forEach((item) => resultArray.push(item));
  return resultArray;
};

// ** 원래 썼던 데이터 분류

// // array 데이터들 분류
// const stockOpen = stockArray.map((item) => item.open);
// const openArray: number[] = [];
// stockOpen?.forEach((open) => openArray.push(open));

// const stockClose = stockArray.map((item) => item.close);
// const closeArray: number[] = [];
// stockClose?.forEach((close) => closeArray.push(close));

// const stockVolume = stockArray.map((item) => item.volume);
// const volumeArray: number[] = [];
// stockVolume?.forEach((volume) => volumeArray.push(volume));

// const stockDate = stockArray.map((item) => item.date);
// const dateArray: string[] = [];
// stockDate?.forEach((date) => dateArray.push(date.toString()));

// const stockHigh = stockArray.map((item) => item.high);
// const highArray: number[] = [];
// stockHigh?.forEach((high) => highArray.push(high));

// const stockLow = stockArray.map((item) => item.low);
// const lowArray: number[] = [];
// stockLow?.forEach((low) => lowArray.push(low));

// const stockName = stockArray.map((item) => item.code_name);
// const nameArray: string[] = [];
// stockName?.forEach((name) => nameArray.push(name));

// const stockClo5 = stockArray.map((item) => item.clo5);
// const clo5Array: number[] = [];
// stockClo5?.forEach((clo5) => clo5Array.push(clo5));

// const stockClo20 = stockArray.map((item) => item.clo20);
// const clo20Array: number[] = [];
// stockClo20?.forEach((clo20) => clo20Array.push(clo20));

// const stockClo60 = stockArray.map((item) => item.clo60);
// const clo60Array: number[] = [];
// stockClo60?.forEach((clo60) => clo60Array.push(clo60));
