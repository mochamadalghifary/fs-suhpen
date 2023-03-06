import { DashboardOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../../Enums/Route'

export type IProps = {
  children: React.ReactNode
  headerRightMenu?: React.FC
}

type MenuItem = Required<MenuProps>['items'][number]

// const user = authAction.loggedUser()

const itemsRoleUser: MenuItem[] = [
  {
    key: Route.Dashboard,
    label: <Link to={Route.Dashboard}>Dashboard</Link>,
    icon: <DashboardOutlined />,
  },
  {
    key: 'Menu 1',
    label: <Link to="#">Menu 1</Link>,
    icon: <DashboardOutlined />,
  },
  {
    key: 'Menu 2',
    label: <Link to="#">Menu 2</Link>,
    icon: <DashboardOutlined />,
  },
]

// const itemsRoleAdministrator: MenuItem[] =
//   user?.role == ERole.Administrator
//     ? [
//       {
//         key: 'Iam',
//         label: 'Iam',
//         icon: <IdcardOutlined />,
//         children: [
//           {
//             key: Route.Users,
//             label: <Link to={Route.Users}>User</Link>,
//             icon: <UsergroupAddOutlined />,
//           },
//           {
//             key: Route.Roles,
//             label: <Link to={Route.Roles}>Role</Link>,
//             icon: <UserSwitchOutlined />,
//           },
//         ],
//       },
//     ]
//     : []

export const layoutItems: MenuItem[] = [
  ...itemsRoleUser,
  // ...itemsRoleAdministrator,
]
