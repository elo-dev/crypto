import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Layout, Typography, Space } from 'antd'
import {
  Homepage,
  Navbar,
  Exchanges,
  Cryptocurrencies,
  CryptoDetails,
  News,
} from './components'

import style from './App.module.scss'

function App() {
  return (
    <div className={style.app}>
      <div className={style.app__navbar}>
        <Navbar />
      </div>
      <div className={style.app__main}>
        <Layout>
          <div className={style.routes}>
            <Routes>
              <Route element={<Homepage />} path="/" />
              <Route element={<Exchanges />} path="/exchanges" />
              <Route element={<Cryptocurrencies />} path="/cryptocurrencies" />
              <Route element={<CryptoDetails />} path="/crypto/:coinId" />
              <Route element={<News />} path="/news" />
            </Routes>
          </div>
        </Layout>
        <div className={style.footer}>
          <Typography.Title
            level={5}
            style={{ color: 'white', textAlign: 'center' }}
          >
            Crypto
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default App
