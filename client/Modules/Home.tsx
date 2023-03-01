import { Image, Layout, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import React from 'react'
import { Route } from '../Enums/Route'

const Home: React.FC = () => {
  return (
    <Layout>
      <Header
        style={{
          background: '#ffffff',
        }}
      >
        <Typography
          style={{
            float: 'right',
            backgroundColor: '#ffffff',
            paddingTop: '4px',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingBottom: '4px',
            margin: '14px',
            borderRadius: '2px',
            border: '2px solid #6FAFAB',
          }}
        >
          <a href={Route.Login}>Login</a>
        </Typography>
      </Header>
      <Content>
        <Image
          src="https://suhpen.up.railway.app/images/home.jpg"
          preview={false}
          width="100%"
        />
      </Content>
    </Layout>
  )
}
export default Home
