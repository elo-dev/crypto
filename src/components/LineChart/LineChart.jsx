import React from 'react'
import { Line } from 'react-chartjs-2'
import { Row, Col, Typography } from 'antd'

import style from './LineChart.module.scss'

const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = []
  const coinTimestamp = []

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price)
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    )
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <>
      <Row className={style.chart_header}>
        <Title level={2} className={style.chart_title}>
          {coinName} Price Chart
        </Title>
        <Col className={style.price_container}>
          <Title level={5} className={style.price_change}>
            {coinHistory?.data?.change} %
          </Title>
          <Title level={5} className={style.current_price}>
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  )
}

export default LineChart
