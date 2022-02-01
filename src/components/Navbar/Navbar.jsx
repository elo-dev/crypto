import React from 'react'
import { Typography, Button, Menu, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from '@ant-design/icons'

import style from './Navbar.module.scss'

import icon from '../../assets/images/crypto.png'

const Navbar = () => {
  return (
    <div className={style.nav_container}>
      <div className={style.logo_container}>
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className={style.logo}>
          <Link to="/">Crypto</Link>
        </Typography.Title>
      </div>
      <Menu theme="dark">
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />}>
          <Link to="/exchanges">Exchanges</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Navbar