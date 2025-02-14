import { API } from '@/constants'
import type { IApiPath } from '@/types/api'
import { useApiRequestUtils } from '@/utils/useApiRequestUtils'
import { type BeforeFetchContext, createFetch } from '@vueuse/core'
import { useLogger } from './useLogger'
import { useAuthStore } from '@/stores/auth.ts'
import { storeToRefs } from 'pinia'

export const useApiRequest = (
  path: IApiPath | string,
  options = {},
  noHeaders = false,
) => {
  // TODO: format error messages to a standardized structure
  const { token } = storeToRefs(useAuthStore())
  const { debug, info, error } = useLogger()
  const { replaceEndpointPlaceholders, addQueryParams } = useApiRequestUtils()

  let endpoint: string
  const baseUrl = (import.meta.env.VITE_API_BASE_URL || '') + API.BASE_URL

  try {
    endpoint =
      typeof path === 'string'
        ? path
        : addQueryParams({
            url: replaceEndpointPlaceholders(path),
            query: path.query,
          })

    debug(`Final endpoint value: ${endpoint}`)
  } catch (e) {
    error(e as string)
    return
  }

  const apiCall = createFetch({
    baseUrl,
    options: {
      async beforeFetch({ options }: BeforeFetchContext) {
        info('Before fetch hook')
        if (token.value && options.headers) {
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token.value}`,
          }
        }

        return { options }
      },
      async onFetchError(ctx) {
        ctx.error = {
          code: ctx.response?.status,
          title: ctx.response?.statusText,
          message: ctx.data?.detail,
          url: ctx.response?.url,
        }

        return ctx
      },
      timeout: API.TIMEOUT,
    },
    fetchOptions: {
      headers: noHeaders
        ? {}
        : {
            'Content-Type': 'application/json',
          },
    },
  })

  return apiCall(endpoint, options)
}
