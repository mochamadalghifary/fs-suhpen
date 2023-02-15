import { SearchOutlined } from '@ant-design/icons'
import { Col, Form, FormInstance, Input, Row } from 'antd'
import React from 'react'

export interface IFilterSection {
  filters?: {
    name: string
    component: React.ReactNode
  }[]
  onFiltersChange?: (values: Record<string, any>) => void
  selectedRows?: React.Key[]
  onSearch?: (value: string) => void
  searchValue?: string
}

export type InternalHooks = {
  registerWatch: (FC: (store: Record<string, any>) => void) => void
}
export interface IFilterFormInstance<T = any> extends FormInstance<T> {
  getInternalHooks: (mark: string) => InternalHooks
}
export const HOOK_MARK = 'RC_FORM_INTERNAL_HOOKS'

export const FilterSection = (props: IFilterSection) => {
  const [value, setValue] = React.useState(props.searchValue)
  const [form] = Form.useForm()

  React.useEffect(() => {
    const { registerWatch } = (form as IFilterFormInstance).getInternalHooks(
      HOOK_MARK,
    )

    const cancelRegister = registerWatch((store) =>
      props?.onFiltersChange(store),
    )
    return cancelRegister
  }, [])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      props.onSearch && props.onSearch(value)
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [value])

  return (
    <Row gutter={[8, 0]} align="middle">
      {/* Filters */}
      <Form form={form}>
        <Row gutter={[8, 0]} align="middle">
          {props.filters?.map((item, index) => {
            return (
              <Col key={index} style={{ margin: '2px' }}>
                <Form.Item name={item.name} noStyle>
                  {item.component}
                </Form.Item>
              </Col>
            )
          })}
        </Row>
      </Form>

      {/* Search */}
      {props.onSearch && (
        <Col flex="auto">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            allowClear
            style={{ margin: '2px', width: '250px' }}
          />
        </Col>
      )}
    </Row>
  )
}
