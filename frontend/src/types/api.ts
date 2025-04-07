// will replace these
interface IApiItemsParams {
  cat_id: number
}

export type TApiParams = IApiItemsParams
export type TApiQueryParams = any

export interface IApiPath {
  url: string
  params?: TApiParams
  query?: TApiQueryParams
}
