import { UserOutlined } from '@ant-design/icons'
import { Avatar, Descriptions, Row } from 'antd'
import React from 'react'
import DescriptionContainer from '../../../Components/Molecules/DescriptionContainer/DescriptionContainer'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'

const Profile: React.FC = () => {
  return (
    <>
      <PageHeader title="Universitas Bangka Belitung" />
      <Row>
        <Avatar
          size={250}
          icon={<UserOutlined />}
          style={{ margin: '32px' }}
          src={
            'https://pelajarinfo.id/wp-content/uploads/2021/03/Universitas-Bangka-Belitung-Logo.png'
          }
        />
        <DescriptionContainer>
          <Descriptions.Item label="Name">ANNISA PRATIWI</Descriptions.Item>
          <Descriptions.Item label="NIM">2072011022</Descriptions.Item>
          <Descriptions.Item label="Jurusan">Ilmu Kelautan</Descriptions.Item>
          <Descriptions.Item label="Angkatan">2020</Descriptions.Item>
        </DescriptionContainer>
      </Row>
    </>
  )
}

export default Profile
