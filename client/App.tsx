import { ConfigProvider } from 'antd'
import React from 'react'
import Routers from './Routers'
import { globalThemeConfig } from './utils/theme'

const App: React.FC = () => {
  return (
    <ConfigProvider theme={globalThemeConfig}>
      <Routers />
    </ConfigProvider>
  )
}

export default App
