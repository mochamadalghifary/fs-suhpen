import { AuthLoginRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Button, Card, Col, Form, Image, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../Components/Organs/FormContainer/FormContainer'
import { Route } from '../../../Enums/Route'
import { formRule } from '../../../utils/form.rules'
import { authAction } from './auth.action'

const Login: React.FC = () => {
  const user = authAction.loggedUser()
  const navigate = useNavigate()
  const [form] = Form.useForm<AuthLoginRequest>()
  const [isLoading, setIsLoading] = React.useState(false)

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()

    try {
      await form.validateFields()
      const user = await authAction.login(data)
      user && location.replace(Route.Dashboard)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
    }
  }

  if (user) {
    navigate(Route.Dashboard)
    return undefined
  } else
    return (
      <Col
        style={{
          backgroundColor: '#eeeeee',
          paddingBottom: '108px',
          textAlign: 'center',
          backgroundImage:
            'url("http://suhpen.up.railway.app/images/login.jpg")',
        }}
      >
        <Image
          src="https://pelajarinfo.id/wp-content/uploads/2021/03/Universitas-Bangka-Belitung-Logo.png"
          preview={false}
          style={{ width: '20%', opacity: '0%' }}
        />
        <Card
          style={{
            border: '2px solid #007fd0',
            width: '400px',
            margin: 'auto',
            marginTop: '50px',
          }}
        >
          <PageHeader title="Login" />
          <FormContainer
            onFinish={onFinish}
            form={form}
            layout="vertical"
            buttonAction={[
              <Button type="primary" htmlType="submit" disabled={isLoading}>
                Login
              </Button>,
            ]}
          >
            <Form.Item name="email" rules={[formRule.email]}>
              <Input placeholder="Email" type="email" />
            </Form.Item>

            <Form.Item name="password">
              <Input.Password placeholder="Password" type="password" />
            </Form.Item>
          </FormContainer>
        </Card>
      </Col>
    )
}

export default Login
