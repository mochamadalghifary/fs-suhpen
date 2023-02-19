import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { RoleIndexRequest } from '@server/modules/iam/role/infrastructure/role.request'
import { RoleResponse } from '@server/modules/iam/role/infrastructure/role.response'
import React from 'react'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DataTable, {
  paginationTransform,
} from '../../../Components/Organs/DataTable/DataTable'
import { useTableFilter } from '../../../Components/Organs/DataTable/hooks'
import { roleAction } from './role.action'
import { rolesColumns } from './roles.columns'

const RoleS: React.FC = () => {
  const [props, setProps] = React.useState<IPaginateResponse<RoleResponse>>()
  const { status } = useTableFilter<RoleIndexRequest>()
  const fetch = async () => {
    status.isFetching = true
    setProps(await roleAction.fetch())
    status.isFetching = false
  }

  React.useEffect(() => {
    fetch()
  }, [status])

  return (
    <>
      <PageHeader title="Role" />
      <DataTable
        columns={rolesColumns}
        dataSource={props?.data}
        pagination={paginationTransform(props?.meta)}
        loading={status.isFetching}
      />
    </>
  )
}

export default RoleS
