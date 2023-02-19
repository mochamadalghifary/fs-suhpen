import { AuthLoginRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Button, Card, Form, Image, Input } from 'antd'
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
      <div
        style={{
          backgroundColor: '#eeeeee',
          paddingBottom: '11%',
          textAlign: 'center',
        }}
      >
        <Image
          src="https://avatars.githubusercontent.com/u/55073493?v=4"
          preview={false}
          style={{ width: '70%' }}
        />
        <Card
          style={{
            marginLeft: '30%',
            marginRight: '30%',
          }}
        >
          <PageHeader title="Login" />
          <FormContainer
            onFinish={onFinish}
            form={form}
            layout="vertical"
            buttonAction={[
              <a onClick={() => navigate(Route.Register)}>
                Don't have and account? Register
              </a>,
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
      </div>
    )
}

export default Login
