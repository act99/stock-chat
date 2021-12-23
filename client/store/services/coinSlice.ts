import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CoinState {
  coin: string;
}

const initialState: CoinState = {
  coin: "BTC",
};

export const coinSlice = createSlice({
  name: "selectedCoin",
  initialState,
  reducers: {
    selectedCoin: (state: any, action: any) => {
      state.coin = action.payload;
    },
  },
});

export const { selectedCoin } = coinSlice.actions;

export default coinSlice.reducer;

// const initialState = {
//   counter: 0,
//   text: "",
//   list: [],
// };

// const INCREASE = "INCREASE";
// const DECREASE = "DECREASE";
// const CHANGE_TEXT = "CHANGE_TEXT";
// const ADD_TO_LIST = "ADD_TO_LIST";

// function increase() {
//   return {
//     type: INCREASE,
//   };
// }
// const decrease = () => ({
//   type: DECREASE,
// });

// const changeText = (text: string) => ({
//   type: CHANGE_TEXT,
//   text,
// });

// const addToList = (item: any) => ({
//   type: ADD_TO_LIST,
//   item,
// });

// const testReducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     case INCREASE:
//       return {
//         ...state,
//         counter: state.counter + 1,
//       };
//     case DECREASE:
//       return {
//         ...state,
//         counter: state.counter - 1,
//       };
//     case CHANGE_TEXT:
//       return {
//         ...state,
//         text: action.text,
//       };
//     case ADD_TO_LIST:
//       return {
//         ...state,
//         list: state.list.concat(action.item),
//       };
//   }
// };

// const tReducer = ()

// export default testReducer;
