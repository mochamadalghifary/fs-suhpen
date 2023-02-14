import { PlusCircleFilled } from '@ant-design/icons'
import { Button, Col, Row, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {
  title: string
  hrefCreate?: string
}

export const PageHeader: React.FC<IProps> = (props: IProps) => {
  const navigate = useNavigate()

  return (
    <Row style={{ marginBottom: '16px' }}>
      <Col flex="auto">
        <Title style={{ fontSize: '24px', lineHeight: '32px', margin: 0 }}>
          {props.title}
        </Title>
      </Col>
      <Col>
        <Space>
          <React.Fragment>
            {props.hrefCreate && (
              <Button type="primary" onClick={() => navigate(props.hrefCreate)}>
                <PlusCircleFilled />
                New {props.title}
              </Button>
            )}
          </React.Fragment>
        </Space>
      </Col>
    </Row>
  )
}
