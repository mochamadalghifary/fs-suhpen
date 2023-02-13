import { AuthRegisterRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Button, Form, Input, Space } from 'antd'
import React from 'react'
import { FormContainer } from '../../Components/Organs/FormContainer'
import { Route } from '../../Enums/Route'
import { defaultSizeSpace } from '../../utils/theme'
import { authAction } from './Auth.action'

const Register: React.FC = () => {
  const [form] = Form.useForm<AuthRegisterRequest>()
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
                .length > 0 || isLoading
            }
          >
            Register
          </Button>,
        ]}
      >
        <Form.Item label="Name" name="name" required>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" required>
          <Input type="email" />
        </Form.Item>

        <Form.Item label="Password" name="password" required>
          <Input.Password type="password" />
        </Form.Item>

        <Form.Item
          label="Password Confirmation"
          name="passwordConfirmation"
          required
        >
          <Input.Password type="password" />
        </Form.Item>
      </FormContainer>
    </Space>
  )
}

export default Register
