import { UserOutlined } from '@ant-design/icons'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Avatar, Descriptions, Row, Tag } from 'antd'
import React from 'react'
import DescriptionContainer from '../../../Components/Molecules/DescriptionContainer/DescriptionContainer'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import { ERole } from '../Role/Role.enum'
import { profileAction } from './profile.action'

const Profile: React.FC = () => {
  // const navigate = useNavigate()
  const [props, setProps] = React.useState<IApiRes<UserResponse>>()
  const fetch = async () => setProps(await profileAction.getUserLogged())

  React.useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <PageHeader title="Profile" />
      <Row>
        <Avatar
          size={250}
          icon={<UserOutlined />}
          style={{ margin: '32px' }}
          src={
            'http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTHxF6ZFN_jdNkcz_AllyoiVGbY0-UY48Tc42sE4hg22hB5AtTRbeSIdDgue-WwL7sLimP1OvgHp39lVIA'
          }
        />
        <DescriptionContainer>
          {/* <Descriptions.Item label="ID">{props?.data?.id}</Descriptions.Item> */}
          <Descriptions.Item label="Name">
            {props?.data?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            {props?.data.role == ERole.Administrator ? (
              <Tag color="blue">{props?.data.role}</Tag>
            ) : (
              <Tag color="green">{props?.data.role}</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {props?.data?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {props?.data?.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {props?.data?.address}
          </Descriptions.Item>
          {/* <Descriptions.Item label="Action">
            <Button type="primary" onClick={() => navigate(Route.ProfileEdit)}>
              <EditOutlined />
            </Button>
          </Descriptions.Item> */}
        </DescriptionContainer>
      </Row>
    </>
  )
}

export default Profile
