import { AuthLoginRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Button, Form, Input, Space } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FormContainer } from '../../Components/Organs/FormContainer'
import { Route } from '../../Enums/Route'
import { defaultSizeSpace } from '../../utils/theme'
import { authAction } from './Auth.action'

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
    <Space
      direction="vertical"
      size={defaultSizeSpace}
      style={{ width: '100%' }}
    >
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
                .length > 0 && isLoading
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
    </Space>
  )
}

export default Login
