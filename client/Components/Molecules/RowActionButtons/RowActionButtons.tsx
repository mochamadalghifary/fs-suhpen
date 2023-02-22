import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Space, Tooltip } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

type ButtonType = 'view' | 'edit' | 'delete' | 'check' | 'close'

interface IRowActionButtonsProps {
  type?: ButtonType
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
}

interface IRowActionProps {
  actions: IRowActionButtonsProps[]
}

export const RowActionButtons: React.FC<IRowActionProps> = ({ actions }) => {
  const renderButton = (action: IRowActionButtonsProps) => {
    let { icon } = action

    if (!icon) {
      switch (action.type) {
        case 'view':
          icon = <EyeOutlined style={{ color: 'green' }} />
          break
        case 'edit':
          icon = <EditOutlined style={{ color: 'blue' }} />
          break
        case 'delete':
          icon = <DeleteOutlined style={{ color: 'red' }} />
          break
        case 'check':
          icon = <CheckCircleOutlined style={{ color: 'green' }} />
          break
        case 'close':
          icon = <CloseCircleOutlined style={{ color: 'red' }} />
          break

        default:
          break
      }
    }

    return (
      <Tooltip title={action.type} key={action.type}>
        <Link to={action.href || ''} onClick={action.onClick}>
          {icon}
        </Link>
      </Tooltip>
    )
  }

  return (
    <Space direction="vertical">
      <Space wrap>{actions.map((action) => renderButton(action))}</Space>
    </Space>
  )
}
