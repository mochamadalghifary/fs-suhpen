import { Result } from 'antd'
import React from 'react'
import { PageHeader } from '../../Components/Molecules/Headers/PageHeader'

const Dashboard: React.FC = () => {
  return (
    <>
      <PageHeader title="Dashboard" />
      <Result status="500" title="500" subTitle="Slicing Dashboard" />
    </>
  )
}

export default Dashboard
