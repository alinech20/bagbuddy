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
  const { trace, debug, error: logError } = useLogger()
  const eventBus = useEventBus<ISnackBarError>(BUS_EVENTS.SNACKBAR)

  const createApiError = (error: any, userMessage?: string): IApiError => {
    trace('Creating API error')
    const timestamp = new Date().toISOString()
    const getBaseError = (): IApiError => ({
      timestamp,
      path: window.location.pathname,
      technical: {
        message:
          // eslint-disable-next-line max-len
          `${error.data.statusCode} ${error.data.error}: ${error.data.message}` ||
          'Unknown error occurred',
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
      status: error.data.statusCode,
      url: error.context?.url || '',
      method: error.context?.options?.method,
      technical: {
        message:
          // eslint-disable-next-line max-len
          `${error.data.statusCode} ${error.data.error}: ${error.data.message}` ||
          'Request failed',
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
          err.user.title = 'Authentication Error'
          err.user.message = userMessage || 'Authentication required.'
          break
        case 403:
          err.type = ERROR_TYPE.AUTHORIZATION
          err.user.title = 'Authorization Error'
          err.user.message = userMessage || 'Access denied.'
          break
        case 404:
          err.type = ERROR_TYPE.CLIENT
          err.user.message =
            userMessage || 'Resource not found. Please check the URL.'
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

    if (error.data) {
      errorObj = populateError(errorObj)
      const status = error.data.statusCode
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
    trace('Handling error')
    let error
    if ('data' in err) error = createApiError(err, userMessage)
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
