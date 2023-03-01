import { Card, Col, Divider, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import DataTable from '../../Components/Organs/DataTable/DataTable'
import { temperaturesColumns } from './dashboard-temperature.columns'
import { temperaturesData } from './dashboard-temperature.data'

const Dashboard: React.FC = () => {
  return (
    <Col>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
        RANCANG BANGUN ALAT MONITORING PENETASAN PENYU SEMI ALAMI DI PULAU BUKU
        LIMAU, BELITUNG TIMUR
      </Title>
      <Row>
        <Card
          title="28° C"
          style={{ margin: '10px', backgroundColor: '#8dee9b' }}
        >
          Safe
        </Card>
        <Card
          title="25° C"
          style={{ margin: '10px', backgroundColor: '#ffea61' }}
        >
          Warning
        </Card>
        <Card
          title="45° C"
          style={{ margin: '10px', backgroundColor: '#F75964' }}
        >
          Danger
        </Card>
      </Row>
      <Divider />
      <DataTable columns={temperaturesColumns} dataSource={temperaturesData} />
    </Col>
  )
}

export default Dashboard
