import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoExchangesApiHeaders = {
  'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
  'x-rapidapi-key': 'ec7fe49000mshb1990590305e834p15fd22jsnf41f842408a3',
}

const baseUrl = 'https://investing-cryptocurrency-markets.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: cryptoExchangesApiHeaders })

export const cryptoExchangesApi = createApi({
  reducerPath: 'cryptoExchangesApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoExchangesList: builder.query({
      query: () => createRequest('/currencies/list'),
    }),
    getCryptoExchangeRate: builder.query({
      query: ({ from, to }) =>
        createRequest(
          `/currencies/get-rate/?fromCurrency=${from}&toCurrency=${to}`
        ),
    }),
  }),
})

export const { useGetCryptoExchangesListQuery, useGetCryptoExchangeRateQuery } =
  cryptoExchangesApi
