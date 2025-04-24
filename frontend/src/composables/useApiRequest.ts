import { API } from '@/constants'
import type { IApiPath } from '@/types/api'
import { useApiRequestUtils } from '@/utils/useApiRequestUtils'
import { type BeforeFetchContext, createFetch } from '@vueuse/core'
import { useLogger } from './useLogger'
import { useAuthStore } from '@/stores/auth.ts'
import { storeToRefs } from 'pinia'
import { useHttpRequestsStore } from '@/stores/http-requests.ts'
import { useErrorHandler } from '@/utils/useErrorHandler.ts'

export const useApiRequest = (
  path: IApiPath | string,
  options = {},
  noHeaders = false,
) => {
  const { token } = storeToRefs(useAuthStore())
  const httpRequestsStore = useHttpRequestsStore()
  const { addRequest, removeRequest } = httpRequestsStore
  const { debug, trace } = useLogger()
  const { handleError } = useErrorHandler()
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
    handleError(e, 'Unable to create API request')
    return
  }

  const apiCall = createFetch({
    baseUrl,
    options: {
      async beforeFetch({ options }: BeforeFetchContext) {
        trace('Before fetch hook')

        addRequest()

        if (token.value && options.headers) {
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token.value}`,
          }
        }

        return { options }
      },
      async onFetchError(ctx) {
        ctx.error = handleError(ctx, ctx.data?.message)
        removeRequest()
        return ctx
      },
      async afterFetch(ctx) {
        trace('After fetch hook')
        removeRequest()
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
