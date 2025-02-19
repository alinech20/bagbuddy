import { useLogger } from '@/composables/useLogger'
import type { IApiPath } from '@/types/api'

export const useApiRequestUtils = () => {
  const { info, debug } = useLogger()

  function replaceEndpointPlaceholders({ url, params }: IApiPath) {
    info('Replacing endpoint placeholders...')
    debug(`url: ${url}`)
    debug(`params: ${JSON.stringify(params)}`)

    if (!params) return url

    if (Object.keys(params).length < 1)
      throw 'params is empty object at replaceEndpointPlaceholders'

    for (const key in params) {
      debug(`Params key value: ${key}`)
      const placeholder = `{${key}}`
      debug(`Placeholder: ${placeholder}`)

      if (url.includes(placeholder))
        url = url.replace(placeholder, params[key as keyof typeof params])
      else throw 'Invalid param at replaceEndpointPlaceholders'
    }

    return url.replace(/\{(.*?)\}/gim, '').replace('//', '/')
  }

  function addQueryParams({ url, query }: IApiPath) {
    info('Adding query params...')
    debug(`url: ${url}`)
    debug(`query: ${JSON.stringify(query)}`)

    if (!query) return url

    if (Object.keys(query).length < 1)
      throw 'query is empty object at addQueryParams'

    let queryString = '?'

    for (const key in query) {
      debug(`Params key value: ${key}`)

      if (queryString !== '?') queryString += '&'
      queryString += `${key}=`

      const val = query[key]
      debug(`Value: ${val}`)
      queryString += `${val}`
    }

    debug(`Query string: ${queryString}`)

    return (url + queryString).replace(/\{(.*?)\}/gim, '').replace('//', '/')
  }

  return {
    replaceEndpointPlaceholders,
    addQueryParams,
  }
}
