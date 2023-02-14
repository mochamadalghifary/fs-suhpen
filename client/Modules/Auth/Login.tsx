import { AuthLoginRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Button, Form, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../Components/Molecules/Section/Section'
import { FormContainer } from '../../Components/Organs/FormContainer'
import { Route } from '../../Enums/Route'
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

  user && navigate(Route.Dashboard)

  return (
    <Section>
      <PageHeader title="Login" />
      <FormContainer
        onFinish={onFinish}
        form={form}
        layout="vertical"
        centered
        buttonAction={[
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              form.getFieldsError().filter(({ errors }) => errors.length)
                .length > 0 || isLoading
            }
          >
            Login
          </Button>,
        ]}
      >
        <Form.Item label="Email" name="email" required>
          <Input type="email" />
        </Form.Item>

        <Form.Item label="Password" name="password" required>
          <Input.Password type="password" />
        </Form.Item>
      </FormContainer>
    </Section>
  )
}

export default Login
