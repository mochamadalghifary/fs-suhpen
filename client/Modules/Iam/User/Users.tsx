import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { UserIndexRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import React from 'react'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DataTable, {
  paginationTransform,
} from '../../../Components/Organs/DataTable/DataTable'
import { useTableFilter } from '../../../Components/Organs/DataTable/hooks'
import { ERole } from '../../../Enums/Role.enum'
import { Route } from '../../../Enums/Route'
import { userAction } from './user.action'
import { usersColumns } from './users.columns'

const Users: React.FC = () => {
  const [props, setProps] = React.useState<IPaginateResponse<UserResponse>>()
  const fetch = async () => setProps(await userAction.fetch(query))
  const { setQueryParams, query, status } = useTableFilter<UserIndexRequest>()

  React.useEffect(() => {
    status.isFetching = true
    fetch()
    status.isFetching = false
  }, [query])

  return (
    <>
      <PageHeader title="User" hrefCreate={Route.UserForm} />
      <DataTable
        filterComponents={[
          { name: 'role', enum: ERole },
          { name: 'dateRangePicker' },
        ]}
        onChange={({ dateRangePicker, ...filtersState }) => {
          setQueryParams({
            ...filtersState,
            startAt: dateRangePicker?.[0]?.toISOString(),
            endAt: dateRangePicker?.[1]?.toISOString(),
          })
        }}
        columns={usersColumns}
        dataSource={props?.data}
        rowKey="id"
        search={query.search}
        pagination={paginationTransform(props?.meta)}
        loading={status.isFetching}
      />
    </>
  )
}

export default Users
