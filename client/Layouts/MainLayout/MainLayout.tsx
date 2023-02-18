import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import React from 'react'
import { Section } from '../../Components/Molecules/Section/Section'
import useUser from '../../Hooks/useUser'
import { sidebarThemeConfig } from '../../utils/theme'
import ImageCompany from './ImageCompany'
import ProfileBar from './ProfileBar'
import Sidebar from './Sidebar'

type IProps = {
  children: React.ReactNode
  headerRightMenu?: React.FC
}

const { Header, Sider, Content } = Layout

const MainLayout: React.FC<IProps> = ({ children }: IProps) => {
  const { user } = useUser()
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          backgroundColor: sidebarThemeConfig.components.Menu.colorItemBg,
          height: '100vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <ImageCompany />
          <Sidebar />
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            height: '9%',
            background: '#ffffff',
          }}
        >
          <a onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </a>
          <ProfileBar user={user} />
        </Header>
        <Content
          style={{
            padding: '20px 20px',
            overflow: 'auto',
          }}
        >
          <Section>{children}</Section>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
