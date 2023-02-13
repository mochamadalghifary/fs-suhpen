import { ConfigProvider } from 'antd'
import locale from 'antd/locale/id_ID'
import 'dayjs/locale/id'
import React from 'react'
import Routers from './Routers'
import { globalThemeConfig } from './utils/theme'

const App: React.FC = () => {
  return (
    <>
      <ConfigProvider theme={globalThemeConfig} locale={locale}>
        <Routers />
      </ConfigProvider>
    </>
  )
}

export default App
