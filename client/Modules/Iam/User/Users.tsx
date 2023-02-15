import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { UserIndexRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Select } from 'antd'
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
  const fetching = async () => {
    setProps(await userAction.fetch(filters))
  }

  const {
    setQueryParams,
    filters,
    status: { isFetching },
  } = useTableFilter<UserIndexRequest>()

  React.useEffect(() => {
    fetching()
  }, [filters])

  return (
    <>
      <PageHeader title="User" hrefCreate={Route.UserForm} />
      <DataTable
        filterComponents={[
          {
            name: 'role',
            component: (
              <Select
                placeholder="Role"
                options={React.useMemo(() => {
                  return Object.keys(ERole).map((key) => {
                    return { label: key, value: key }
                  })
                }, [])}
                defaultValue={filters.role}
                allowClear
                style={{ width: '100px' }}
              />
            ),
          },
        ]}
        onChange={({ ...filtersState }) => {
          setQueryParams({
            ...filtersState,
            role: filters.role,
          })
        }}
        columns={usersColumns}
        dataSource={props?.data}
        rowKey="id"
        search={filters.search}
        pagination={paginationTransform(props?.meta)}
        loading={isFetching}
      />
    </>
  )
}

export default Users
