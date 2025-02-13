import { BUS_EVENTS } from '@/constants'
import type { IApiCallError } from '@/types/errors'
import type { TNullable } from '@/types/helpers'
import type { ISnackBarMessage } from '@/types/snackbar'
import { useLogFormatter } from '@/utils/useLogFormatter'
import { useEventBus } from '@vueuse/core'
import log, { type Logger, type LogLevelNames } from 'loglevel'

export const useLogger = () => {
  const snackbar = useEventBus<ISnackBarMessage>(BUS_EVENTS.SNACKBAR)
  let instance: TNullable<Logger> = null

  if (!instance) {
    instance = log.getLogger('root')

    if (import.meta.env.PROD) instance.setLevel('warn')
    else instance.setLevel('trace')
  }

  const setLevel = (level: LogLevelNames) => {
    instance.setLevel(level, true)
  }

  const {
    formatApiError,
    formatError,
    formatTraceMessage,
    formatDebugMessage,
    formatInfoMessage,
  } = useLogFormatter()

  const trace = (msg: string) => {
    instance.trace(formatTraceMessage(msg))
  }

  const debug = (msg: string) => {
    instance.debug(formatDebugMessage(msg))
  }

  const info = (msg: string) => {
    instance.info(formatInfoMessage(msg))
  }

  const warn = (msg: string) => {
    instance.warn(msg)
  }

  const error = (error: IApiCallError | string, display = true) => {
    const formattedError =
      typeof error === 'string' ? formatError(error) : formatApiError(error)
    instance.error(formattedError)

    if (display) {
      const userError =
        typeof error === 'string'
          ? error
          : `Error ${error.code} ${error.title}: ${error.url}`

      snackbar.emit({
        msg: userError,
        style: 'error',
      })
    }
  }

  return {
    setLevel,
    trace,
    debug,
    info,
    warn,
    error,
  }
}
