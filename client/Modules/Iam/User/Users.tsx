import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import React from 'react'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DataTable from '../../../Components/Organs/DataTable/DataTable'
import { useTableFilter } from '../../../Components/Organs/DataTable/useTableFilter'
import { Route } from '../../../Enums/Route'
import { userAction } from './user.action'
import UserResponse from './user.model'
import { usersColumns } from './users.columns'

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
      <PageHeader title="User" hrefCreate={Route.UserForm} />
      <DataTable
        columns={usersColumns}
        dataSource={props?.data?.map((item) => ({ ...item }))}
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
