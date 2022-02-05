import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import LineChart from '../LineChart/LineChart'

import style from './CryptoDetails.module.scss'

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../services/cryptoApi'

const { Text, Title } = Typography
const { Option } = Select

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState('7d')

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod })
  const cryptoDetails = data?.data?.coin

  if(isFetching) return 'Loading...'

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y']

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ]

  return (
    <Col className={style.coin_detail_container}>
      <Col className={style.coin_heading_container}>
        <Title level={2} className={style.coin_name}>
          {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
        </Title>
        <p>
          {cryptoDetails?.name} live price in US dollars. View value statistics,
          market cup and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className={style.select_timeperiod}
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <LineChart 
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails?.price)}
        coinName={cryptoDetails?.name} 
      />
      <Col className={style.stats_container}>
        <Col className={style.coin_value_stats}>
          <Col className={style.coin_value_stats_heading}>
            <Title level={3} className={style.coin_details_heading}>
              {cryptoDetails?.name} Value Statistics
            </Title>
            <p>
              An overview showing the stats of {cryptoDetails?.name}
            </p>
          </Col>
          {stats.map(({ icon, title, value }, i) => (
            <Col className={style.coin_stats} key={i}>
              <Col className={style.coin_stats__name}>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className={style.stats}>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className={style.coin_desc_link}>
        <Row className={style.coin_desc}>
          <Title level={3} className={style.coin_details_heading}>
            What is {cryptoDetails?.name}
            {HTMLReactParser(cryptoDetails?.description)}
          </Title>
        </Row>
        <Col className={style.coin_links}>
          <Title level={3} className={style.coin_details_heading}>
            {cryptoDetails?.name} links
          </Title>
          {cryptoDetails?.links.map((link, i) => (
            <Row className={style.coin_link} key={i}>
              <Title level={5} className={style.link_name}>
                {link.type}
              </Title>
              <a href={link.url} target='_blank' rel='noreferrer'>
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails
