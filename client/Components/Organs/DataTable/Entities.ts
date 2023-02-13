import type { TableProps } from 'antd/es/table'
import { SorterResult } from 'antd/es/table/interface'
import { IPaginationMeta } from './../../../../@server/infrastructure/index/index.interface'

export type TOrder = {
  order: 'ASC' | 'DESC' | undefined
}

export type TOnSort<T> = Omit<SorterResult<T>, 'order'> & TOrder

export interface IDataTableProps<T> extends TableProps<T> {
  meta: IPaginationMeta
  defaultCurrent?: number
  onSort?: (sorter: TOnSort<T>) => void
  onPageChange: (page: number, pageSize: number) => void
}
