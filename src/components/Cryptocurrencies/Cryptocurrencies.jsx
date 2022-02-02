import React, { useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../../services/cryptoApi'
import { Card, Col, Row } from 'antd'
import style from './Cryptocurrencies.module.scss'

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)

  if(isFetching) return 'Loading...'

  return (
    <>
      <Row gutter={[32, 32]} className={style.crypto_card_container}>
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className={style.crypto_card} key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className={style.crypto_image} src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies
