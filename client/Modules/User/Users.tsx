import { PlusCircleFilled } from '@ant-design/icons'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Button } from 'antd'
import React from 'react'
import DataTable from '../../Components/Organs/DataTable/DataTable'
import { useTableFilter } from '../../Components/Organs/DataTable/useTableFilter'
import { userAction } from './User.action'
import { usersColumns } from './Users.columns'

const Users: React.FC = () => {
  const [props, setProps] = React.useState<IPaginateResponse<UserResponse>>()
  const {
    setQueryParams,
    status: { isFetching },
  } = useTableFilter()

  React.useEffect(() => {
    ;(async () => setProps(await userAction.fetch()))()
  }, [])

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          alert('Tambah Fitur Create User?')
        }}
        style={{
          float: 'right',
        }}
      >
        <PlusCircleFilled />
        New User
      </Button>
      <DataTable
        columns={usersColumns}
        dataSource={props?.data?.map((item) => ({
          ...item,
          // key: item.id,
        }))}
        meta={props?.meta}
        onPageChange={(page, pageSize) =>
          setQueryParams({ page: page, per_page: pageSize })
        }
        loading={isFetching}
      />
    </>
  )
}

export default Users
