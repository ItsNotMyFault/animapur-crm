export interface ListParams {
  page?: number
  limit?: number
  search?: string
}

export interface ListResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
}
