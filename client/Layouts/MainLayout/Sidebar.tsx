import { LogoutOutlined } from '@ant-design/icons'
import { ConfigProvider, Menu } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Route } from '../../Enums/Route'
import { authAction } from '../../Modules/Auth/auth.action'
import { sidebarThemeConfig } from '../../utils/theme'
import { menuItems } from './MainItems'

const Sidebar: React.FC = () => {
  const navigate = useNavigate()

  const activeMenuKey = React.useMemo(
    () => window.location.pathname,
    [window.location.pathname],
  )

  const defaultOpenedKey = React.useMemo(
    () =>
      menuItems.find((item) => {
        if ('children' in item) {
          const openedMenuItem = item.children?.find((chil) => {
            return chil.key === activeMenuKey
          })
          return openedMenuItem !== undefined
        }
        return null
      })?.key as string,
    [menuItems, activeMenuKey],
  )

  const handleLogout = (
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.KeyboardEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault()
    const isConfirm = confirm('Are you sure to logout? ')
    isConfirm && authAction.logout() && navigate(Route.Login)
  }

  return (
    <>
      <ConfigProvider theme={sidebarThemeConfig}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Menu
            items={menuItems}
            theme="light"
            style={{ backgroundColor: '#253DA1' }}
            mode="inline"
            defaultOpenKeys={[defaultOpenedKey]}
            selectedKeys={[activeMenuKey]}
          />

          <Menu
            theme="light"
            style={{ backgroundColor: '#253DA1' }}
            mode="inline"
          >
            <Menu.Divider />
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
              <Link to="#" onClick={handleLogout}>
                Logout
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </ConfigProvider>
    </>
  )
}

export default Sidebar
