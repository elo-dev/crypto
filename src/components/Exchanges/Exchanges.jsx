import React, { useEffect, useState } from 'react'
import {
  useGetCryptoExchangesListQuery,
  useGetCryptoExchangeRateQuery,
} from '../../services/cryptoExchangesApi'
import { Col, Select, Typography, Input, Row } from 'antd'
import { SwapOutlined } from '@ant-design/icons'

import style from './Exchange.module.scss'

const { Option } = Select
const { Text, Title } = Typography

const Exchanges = () => {
  const [currencies, setCurrencies] = useState()
  const [cryptocurrencies, setCryptocurrencies] = useState()

  const [inputCurrencies, setInputCurrencies] = useState()
  const [inputCryptocurrencies, setInputCryptocurrencies] = useState()
  const [inputAmountCrypto, setInputAmountCrypto] = useState(1)

  const [reverseRate, setReverseRate] = useState(false)

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

  const handleClick = () => {
    setReverseRate((prevState) => !prevState)
  }

  return (
    <div className={style.exchange}>
      <Col className={style.exchange_heading_container}>
        {reverseRate ? (
          <Title level={2}>Sell cryptocurrency</Title>
        ) : (
          <Title level={2}>Buy cryptocurrency</Title>
        )}
      </Col>
      <Row className={style.exchange_row}>
        <Col className={style.exchange_col}>
          <Select
            className={style.selectCurrency}
            placeholder="Select currency"
            onChange={(value) => setInputCurrencies(value)}
          >
            {worldCurrencies?.map((currencies) => (
              <Option key={currencies.currency_ID}>
                {currencies.currency_short_name}
              </Option>
            ))}
          </Select>
          <Select
            className={style.selectCryptocurrency}
            placeholder="Select cryptocurrency"
            onChange={(value) => setInputCryptocurrencies(value)}
          >
            {crypto?.map((crypto) => (
              <Option key={crypto.currency_ID}>
                {crypto.currency_short_name}
              </Option>
            ))}
          </Select>
          <div className={style.inputWrapper}>
            <Input
              type="number"
              defaultValue={1}
              placeholder="Amount"
              className={style.input}
              onChange={(e) => setInputAmountCrypto(e.target.value)}
            />
          </div>
          {reverseRate ? (
            <Text className={style.cryptoRate}>
              = {rate ? inputAmountCrypto * rate.reverse : 0}
            </Text>
          ) : (
            <Text className={style.cryptoRate}>
              = {rate ? inputAmountCrypto * rate.basic : 0}
            </Text>
          )}
        </Col>
      </Row>
      <Row className={style.exchange_row}>
        <SwapOutlined className={style.swapIcon} onClick={handleClick} />
      </Row>
    </div>
  )
}

export default Exchanges
