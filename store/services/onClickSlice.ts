import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OnClickState {
  coinSelected: boolean;
}

const initialState: OnClickState = {
  coinSelected: false,
};

export const onClickSlice = createSlice({
  name: "onClicked",
  initialState,
  reducers: {
    onCoinSelectBtnClicked: (state: any, action: any) => {
      state.coinSelected = action.payload;
    },
  },
});

export const { onCoinSelectBtnClicked } = onClickSlice.actions;

export default onClickSlice.reducer;
