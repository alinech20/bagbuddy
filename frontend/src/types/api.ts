// will replace these
interface IApiAuthParams {
  email: string
  password: string
}

type TApiParams = IApiAuthParams
type TApiQueryParams = any

export interface IApiPath {
  url: string
  params?: TApiParams
  query?: TApiQueryParams
}
