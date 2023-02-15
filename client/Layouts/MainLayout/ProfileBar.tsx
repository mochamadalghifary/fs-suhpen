import { UserOutlined } from '@ant-design/icons'
import { IAppUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Avatar, Space, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../../Enums/Route'

type IProps = {
  children?: React.ReactNode
  headerRightMenu?: React.FC
  user: IAppUser
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
        marginLeft: '10px',
        marginTop: '30px',
        marginBottom: '20px',
      }}
    >
      <Link to={Route.Profile}>
        <Space size="small">
          <Avatar icon={<UserOutlined />} />

          <Space.Compact direction="vertical" size="small">
            <Text
              style={{
                fontWeight: '500',
                fontSize: '14px',
                color: '#000000',
              }}
            >
              {props?.user?.name}
            </Text>
          </Space.Compact>
        </Space>
      </Link>
    </div>
  )
}

export default ProfileBar
