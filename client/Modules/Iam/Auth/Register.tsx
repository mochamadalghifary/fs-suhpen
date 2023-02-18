import { AuthRegisterRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Button, Form, Input } from 'antd'
import React from 'react'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../Components/Molecules/Section/Section'
import FormContainer from '../../../Components/Organs/FormContainer/FormContainer'
import { Route } from '../../../Enums/Route'
import { formRule } from '../../../utils/form.rules'
import { authAction } from './auth.action'

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
    <Section>
      <div style={{ backgroundColor: '#eeeeee', justifyContent: 'center' }}>
        <PageHeader title="Register" />
        <FormContainer
          onFinish={onFinish}
          form={form}
          layout="vertical"
          centered
          buttonAction={[
            <Button type="primary" htmlType="submit" disabled={isLoading}>
              Register
            </Button>,
          ]}
        >
          <Form.Item label="Name" name="name" required>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[formRule.email]}>
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[formRule.password]}
          >
            <Input.Password type="password" />
          </Form.Item>

          <Form.Item
            label="Password Confirmation"
            name="passwordConfirmation"
            rules={[formRule.password]}
          >
            <Input.Password type="password" />
          </Form.Item>
        </FormContainer>
      </div>
    </Section>
  )
}

export default Register
