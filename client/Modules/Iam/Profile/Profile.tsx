import { UserOutlined } from '@ant-design/icons'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Avatar, Descriptions, Row, Tag } from 'antd'
import React from 'react'
import DescriptionContainer from '../../../Components/Molecules/DescriptionContainer/DescriptionContainer'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import { profileAction } from './profile.action'

const Profile: React.FC = () => {
  const [props, setProps] = React.useState<IApiRes<UserResponse>>()

  React.useEffect(() => {
    ;(async () => setProps(await profileAction.getUserLogged()))()
  }, [])

  return (
    <>
      <PageHeader title="Profile" />
      <Row>
        <Avatar size={250} icon={<UserOutlined />} style={{ margin: '32px' }} />
        <DescriptionContainer>
          <Descriptions.Item label="ID">{props?.data?.id}</Descriptions.Item>
          <Descriptions.Item label="Name">
            {props?.data?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {props?.data?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {props?.data?.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            <Tag>{props?.data?.role}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {props?.data?.address}
          </Descriptions.Item>
        </DescriptionContainer>
      </Row>
    </>
  )
}

export default Profile
