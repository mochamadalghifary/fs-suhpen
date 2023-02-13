import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React from 'react'
import { iconActionTableStyle } from '../../../utils/theme'

type ButtonType = 'view' | 'edit' | 'delete' | 'check' | 'close'

interface IRowActionButtonsProps {
  type?: ButtonType
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
  title?: string
  disabled?: boolean
}

interface IRowActionProps {
  actions: IRowActionButtonsProps[]
}

export const RowActionButtons: React.FC<IRowActionProps> = ({ actions }) => {
  const renderButton = (action: IRowActionButtonsProps) => {
    const { type, href, onClick, title, disabled } = action
    let { icon } = action

    if (!icon) {
      switch (type) {
        case 'view':
          icon = <EyeOutlined style={{ color: 'green' }} />
          break
        case 'edit':
          icon = <EditOutlined style={iconActionTableStyle} />
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
      <Tooltip title={title} key={title}>
        <Button
          type="text"
          shape="circle"
          href={href}
          onClick={onClick}
          icon={icon}
          disabled={disabled}
        />
      </Tooltip>
    )
  }

  return (
    <Space direction="vertical">
      <Space wrap>{actions.map((action) => renderButton(action))}</Space>
    </Space>
  )
}
