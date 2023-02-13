import { IPaginationMeta } from '../index/index.interface'

export interface IApiRes<T> {
  message: string
  meta?: IPaginationMeta
  data: T
}

interface IDataUnprocessable {
  property: string
  message: string[]
}

export interface IUnprocessableResponse {
  message: string
  data: Array<IDataUnprocessable>
}
