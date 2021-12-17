import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { createWrapper } from "next-redux-wrapper";
import {
  cryptoApi,
  cryptoCompareHistoryApi,
  cryptoHistoryApi,
} from "../services/cryptoApi";

import counterReducer from "../services/exercise";

import testReducer from "../services/exercise";

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoHistoryApi.reducerPath]: cryptoHistoryApi.reducer,
    [cryptoCompareHistoryApi.reducerPath]: cryptoCompareHistoryApi.reducer,
    counter: counterReducer,
  },
});

export type CommonRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
