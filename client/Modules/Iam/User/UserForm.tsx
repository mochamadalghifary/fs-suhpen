import { UserCreateRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { Button, Form, Input } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../Components/Organs/FormContainer/FormContainer'
import { Route } from '../../../Enums/Route'
import { formRule } from '../../../utils/form.rules'
import { userAction } from './user.action'

const UserForm: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<UserCreateRequest>()
  const [isLoading, setIsLoading] = React.useState(false)
  const fetch = async () => {
    const res = await userAction.findOne(id)
    form.setFieldsValue(res.data)
  }

  React.useEffect(() => {
    id && fetch()
  }, [])

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()

    try {
      id && (await userAction.update(data)) && alert('Success update data')
      !id && (await userAction.create(data)) && alert('Success create data')
      setIsLoading(false)
      navigate(Route.Users)
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
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Save
          </Button>,
        ]}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[formRule.required]}
          required
        >
          <Input />
        </Form.Item>

        {!id && (
          <Form.Item
            label="Email"
            name="email"
            rules={[formRule.email]}
            required
          >
            <Input type="email" />
          </Form.Item>
        )}
      </FormContainer>
    </>
  )
}

export default UserForm
