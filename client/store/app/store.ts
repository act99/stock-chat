import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { createWrapper } from "next-redux-wrapper";
import {
  cryptoApi,
  cryptoCompareHistoryApi,
  cryptoHistoryApi,
} from "../services/cryptoApi";

import selectedCoinReducer from "../services/coinSlice";
import onCoinSelectBtnClickedReducer from "../services/onClickSlice";
import { stockApi } from "../services/stockApi";

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoHistoryApi.reducerPath]: cryptoHistoryApi.reducer,
    [cryptoCompareHistoryApi.reducerPath]: cryptoCompareHistoryApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    selectedCoin: selectedCoinReducer,
    CoinSelectBtnClick: onCoinSelectBtnClickedReducer,
  },
});

export type CommonRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
