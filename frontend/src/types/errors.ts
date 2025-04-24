export enum ERROR_SEVERITY {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

export enum ERROR_TYPE {
  NETWORK = 'network',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  VALIDATION = 'validation',
  SERVER = 'server',
  CLIENT = 'client',
  UNKNOWN = 'unknown',
}

export interface IBaseError {
  user: {
    title?: string
    message: string
  }
  severity: ERROR_SEVERITY
}

export interface IApiError extends IBaseError {
  status?: number
  timestamp: string
  url?: string
  path: string
  method?: string
  technical: {
    message: string
    originalError?: any
  }

  type: ERROR_TYPE
  context?: Record<string, any>
}

export type TError = IBaseError | IApiError
