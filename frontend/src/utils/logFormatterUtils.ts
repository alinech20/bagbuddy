import type { IApiError, TError } from '@/types/errors'

export const logFormatterUtils = () => {
  const getCurrentTimestamp = () => new Date().toISOString().replace('T', ' ').replace('Z', '')

  const formatApiError = (error: IApiError) => ({
    timestamp: error.timestamp,
    url: error.url,
    path: error.path,
    method: error.method,
    status: error.status,
    type: error.type,
    severity: error.severity,
    message: error.technical.message,
    context: error.context,
  })

  const formatError = (error: string | TError) => {
    if (typeof error === 'string') {
      return `${getCurrentTimestamp()} ❌ ERROR: ${error}`
    }

    if ('status' in error) {
      return {
        message: `${getCurrentTimestamp()} ❌ ERROR [${error.type.toUpperCase()}]:`,
        data: formatApiError(error),
      }
    }

    return {
      message: `${getCurrentTimestamp()} ❌ ERROR: [${error.severity.toUpperCase()}]`,
      data: {
        title: error.user.title,
        message: error.user.message,
      },
    }
  }

  const formatTraceMessage = (msg: string) => {
    return `${getCurrentTimestamp()} TRACE: ${msg}`
  }

  const formatDebugMessage = (msg: string) => {
    return `${getCurrentTimestamp()} 🔍 DEBUG: ${msg}`
  }

  const formatInfoMessage = (msg: string) => {
    return `${getCurrentTimestamp()} ℹ️ INFO: ${msg}`
  }

  const formatWarnMessage = (msg: string) => {
    return `${getCurrentTimestamp()} ⚠️ WARNING: ${msg}`
  }

  return {
    formatError,
    formatTraceMessage,
    formatDebugMessage,
    formatInfoMessage,
    formatWarnMessage,
  }
}
