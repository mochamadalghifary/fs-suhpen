import { UserOutlined } from '@ant-design/icons'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Avatar, Space, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../../Enums/Route'

type IProps = {
  children?: React.ReactNode
  headerRightMenu?: React.FC
  user: IUser
}

const { Text } = Typography

const ProfileBar: React.FC<IProps> = (props: IProps) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '1000x',
        padding: '8px 16px',
        marginTop: '30px',
        marginBottom: '20px',
      }}
    >
      <Link to={Route.Profile}>
        <Space size="small">
          <Avatar icon={<UserOutlined />} src={props?.user.avatar} />

          <Space.Compact direction="vertical" size="small">
            <Text>{props?.user?.name}</Text>
          </Space.Compact>
        </Space>
      </Link>
    </div>
  )
}

export default ProfileBar
