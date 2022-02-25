import React, { useEffect, useState } from 'react'
import {
  useGetCryptoExchangesListQuery,
  useGetCryptoExchangeRateQuery,
} from '../../services/cryptoExchangesApi'
import { Row, Col, Select, Typography } from 'antd'

import style from './Exchange.module.scss'

const { Option } = Select
const { Text } = Typography

const Exchanges = () => {
  const [currencies, setCurrencies] = useState()
  const [cryptocurrencies, setCryptocurrencies] = useState()

  const [inputCurrencies, setInputCurrencies] = useState()
  const [inputCryptocurrencies, setInputCryptocurrencies] = useState()

  useEffect(() => {
    if (inputCurrencies && inputCryptocurrencies) {
      setCurrencies(inputCurrencies)
      setCryptocurrencies(inputCryptocurrencies)
    }
  }, [inputCurrencies, inputCryptocurrencies])

  const { data: exchangesList, isFetching: isLoadingList } =
    useGetCryptoExchangesListQuery()

  const { data: exchangeRate, isFetching: isLoadingRate } =
    useGetCryptoExchangeRateQuery({
      from: cryptocurrencies,
      to: currencies,
    })

  const [crypto, setCrypto] = useState([])
  const [worldCurrencies, setWorldCurrencies] = useState([])
  const [rate, setRate] = useState()

  useEffect(() => {
    setData()
  }, [isLoadingList])

  const setData = () => {
    exchangesList?.data[0].forEach((el) => {
      if (el.order === 1) {
        setCrypto(el.data)
      } else if (el.order === 3) {
        setWorldCurrencies(el.data)
      }
    })
  }

  useEffect(() => {
    exchangeRate?.data[0].forEach((el) => {
      setRate(el)
    })
  }, [isLoadingRate])

  if (isLoadingList) return 'Loading...'

  return (
    <div className={style.exchange}>
      <Row>
        <Col>
          <Select
            className={style.select}
            placeholder="Select currencies"
            onChange={(value) => setInputCurrencies(value)}
          >
            {worldCurrencies?.map((currencies) => (
              <Option key={currencies.currency_ID}>
                {currencies.currency_short_name}
              </Option>
            ))}
          </Select>
          <Select
            className={style.select}
            placeholder="Select cryptocurrencies"
            onChange={(value) => setInputCryptocurrencies(value)}
          >
            {crypto?.map((crypto) => (
              <Option key={crypto.currency_ID}>
                {crypto.currency_short_name}
              </Option>
            ))}
          </Select>
          <Text className={style.cryptoRate}>= {rate ? rate.basic : 0}</Text>
        </Col>
      </Row>
    </div>
  )
}

export default Exchanges
