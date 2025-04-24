// will replace these

interface IApiItemsParams {
  cat_id: number
}

interface IApiAuthParams {
  email: string
  password: string
}

export type TApiParams = IApiItemsParams | IApiAuthParams
export type TApiQueryParams = any

export interface IApiPath {
  url: string
  params?: TApiParams
  query?: TApiQueryParams
}
