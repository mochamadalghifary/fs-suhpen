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
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true }]}
          required
        >
          <Input />
        </Form.Item>
      </FormContainer>
    </>
  )
}

export default UserForm
