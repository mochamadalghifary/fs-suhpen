import { UserCreateRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { Button, Form, Input } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import { FormContainer } from '../../../Components/Organs/FormContainer'
import { userAction } from './user.action'

const UserForm: React.FC = () => {
  const { id } = useParams()
  const [form] = Form.useForm<UserCreateRequest>()
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    id &&
      (async () => {
        const res = await userAction.findOne(id)
        form.setFieldsValue(res.data)
      })()
  }, [])

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()

    try {
      await form.validateFields()
      await userAction.create(data)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
    }
  }

  return (
    <>
      <PageHeader title="User Form" />
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
            Save
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
    </>
  )
}

export default UserForm
