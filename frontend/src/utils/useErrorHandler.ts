import { useLogger } from '@/composables/useLogger.ts'
import { useEventBus } from '@vueuse/core'
import type { ISnackBarError } from '@/types/snackbar.ts'
import { BUS_EVENTS, SNACKBAR_DURATION } from '@/constants.ts'
import {
  ERROR_SEVERITY,
  ERROR_TYPE,
  type IApiError,
  type TError,
} from '@/types/errors.ts'

export const useErrorHandler = () => {
  const { error: logError } = useLogger()
  const eventBus = useEventBus<ISnackBarError>(BUS_EVENTS.SNACKBAR)

  const createApiError = (error: any, userMessage?: string): IApiError => {
    const timestamp = new Date().toISOString()
    const getBaseError = (): IApiError => ({
      timestamp,
      path: window.location.pathname,
      technical: {
        message: error?.message || 'Unknown error occurred',
        originalError: error.error,
      },
      user: {
        message: userMessage || 'Something went wrong. Please try again later.',
      },
      type: ERROR_TYPE.UNKNOWN,
      severity: ERROR_SEVERITY.ERROR,
    })
    const populateError = (err: IApiError): IApiError => ({
      ...err,
      status: error.response.status,
      url: error.response.url || '',
      method: error.context?.options?.method,
      technical: {
        message: error.data?.detail || error?.message || 'Request failed',
        originalError: error.error,
      },
    })
    const setExtraErrorData = (err: IApiError, status: number): IApiError => {
      switch (status) {
        case 400:
        case 422:
          err.type = ERROR_TYPE.VALIDATION
          err.user.title = 'Validation Error'
          err.user.message =
            userMessage || 'Please check your input and try again.'
          break
        case 401:
          err.type = ERROR_TYPE.AUTHENTICATION
          err.user.message = userMessage || 'Authentication required.'
          break
        case 403:
          err.type = ERROR_TYPE.AUTHORIZATION
          err.user.message = userMessage || 'Access denied.'
          break
        case 404:
          err.type = ERROR_TYPE.CLIENT
          err.severity = ERROR_SEVERITY.WARNING
          break
        default:
          if (status >= 500) {
            err.type = ERROR_TYPE.SERVER
            err.severity = ERROR_SEVERITY.CRITICAL
            err.user.message =
              userMessage || 'Server error. Please try again later.'
          } else err.type = ERROR_TYPE.CLIENT
      }

      return err
    }

    let errorObj = getBaseError()

    if (error.response) {
      errorObj = populateError(errorObj)
      const status = error.response.status
      if (status) errorObj = setExtraErrorData(errorObj, status)
    }

    return errorObj
  }

  const displayError = (error: TError) => {
    eventBus.emit({
      title: error.user.title || 'Error',
      msg: error.user.message,
      style: error.severity,
      duration: SNACKBAR_DURATION,
    })
  }

  const handleError = (err: any, userMessage?: string): TError => {
    let error
    if ('status' in err) error = createApiError(err, userMessage)
    else
      error = {
        user: {
          title: 'Error',
          message: userMessage || err.message || 'An unknown error occurred.',
        },
        severity: ERROR_SEVERITY.ERROR,
      }

    logError(error)
    displayError(error)

    return error
  }

  return {
    handleError,
  }
}
