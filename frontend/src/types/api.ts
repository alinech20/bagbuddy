// will replace these
interface IApiAuthParams {
  email: string
  password: string
}

export type TApiParams = IApiAuthParams
export type TApiQueryParams = any

export interface IApiPath {
  url: string
  params?: TApiParams
  query?: TApiQueryParams
}
