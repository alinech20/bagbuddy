import type { TError } from '@/types/errors'
import type { TNullable } from '@/types/helpers'
import { useLogFormatter } from '@/utils/useLogFormatter'
import log, { type Logger, type LogLevelNames } from 'loglevel'

export const useLogger = () => {
  let instance: TNullable<Logger> = null

  if (!instance) {
    instance = log.getLogger('root')

    if (import.meta.env.PROD) instance.setLevel('warn')
    else instance.setLevel('debug')
  }

  const setLevel = (level: LogLevelNames) => {
    instance.setLevel(level, true)
  }

  const {
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

  const error = (error: TError | string) => {
    const formattedError = formatError(error)

    if (typeof formattedError === 'string')
      return instance.error(formattedError)

    instance.error(formattedError.message, formattedError.data)
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
