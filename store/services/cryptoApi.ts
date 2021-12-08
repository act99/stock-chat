import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": process.env.REACT_APP_CRYPTO_API_KEY,
};

const baseUrl = "https://coinranking1.p.rapidapi.com";
const cryptoCompareURL = "https://min-api.cryptocompare.com/data";

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (name) => createRequest(`/${name}`),
    }),
  }),
});

export const cryptoHistoryApi = createApi({
  reducerPath: "cryptoHistoryApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptosHistory: builder.query({
      query: (id) => createRequest(`/coin/${id}/history/7d`),
    }),
  }),
});

export const cryptoCompareHistoryApi = createApi({
  reducerPath: "cryptoCompareHistoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: cryptoCompareURL }),
  endpoints: (builder) => ({
    getCryptoCompareHistory: builder.query({
      query: ({ limit, coin }) => {
        return {
          url: `/v2/histoday?fsym=${coin}&tsym=USD&limit=${limit}`,
        };
      },
    }),
    getCryptoCompareVolume: builder.query({
      query: ({ limit, coin }) => {
        return {
          url: `/exchange/symbol/histoday?fsym=${coin}&tsym=USD&limit=${limit}&e=Binance`,
        };
      },
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
export const { useGetCryptosHistoryQuery } = cryptoHistoryApi;
export const {
  useGetCryptoCompareHistoryQuery,
  useGetCryptoCompareVolumeQuery,
} = cryptoCompareHistoryApi;
