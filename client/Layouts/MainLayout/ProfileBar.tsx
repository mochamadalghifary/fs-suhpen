import { UserOutlined } from '@ant-design/icons'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Avatar, Image, Space, Typography } from 'antd'
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
    <>
      <Image
        src="https://avatars.githubusercontent.com/u/55073493?v=4"
        preview={false}
        style={{
          width: '75%',
          paddingLeft: '40px',
        }}
      />
      <div style={{ height: '10px' }}></div>
      <Link
        to={Route.Profile}
        style={{
          width: '100%',
          backgroundColor: '#eeeeee',
          borderRadius: '20px 0px 0px 20px',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 10px',
        }}
      >
        <Space size="small">
          <Avatar icon={<UserOutlined />} src={props?.user.avatar} />

          <Space.Compact direction="vertical" size="small">
            <Text>{props?.user?.name}</Text>
          </Space.Compact>
        </Space>
      </Link>
    </>
  )
}

export default ProfileBar
