import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increasement: (state: any) => {
      state.value += 1;
    },
    decreasement: (state: any) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increasement, decreasement, incrementByAmount } =
  counterSlice.actions;

export default counterSlice.reducer;

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
