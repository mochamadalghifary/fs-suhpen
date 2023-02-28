import { Image, Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <Layout>
      <Header
        style={{
          background: '#6FAFAB',
          justifyContent: 'space-around',
        }}
      >
        <Link to="#">Home</Link>
        <Link to="#">Profile</Link>
      </Header>
      <Content
        style={{
          padding: '20px 20px',
          overflow: 'auto',
        }}
      >
        <Image src="https://suhpen.up.railway.app/images/home.jpg" />
      </Content>
    </Layout>
  )
}
export default Home
