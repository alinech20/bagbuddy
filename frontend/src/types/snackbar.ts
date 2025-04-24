import type { ERROR_SEVERITY } from '@/types/errors.ts'

interface ISnackBarBaseMessage {
  msg: string
  duration?: number
}

export interface ISnackBarError extends ISnackBarBaseMessage {
  title: string
  style: ERROR_SEVERITY
}
