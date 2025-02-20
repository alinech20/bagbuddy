import { describe, expect, it } from 'vitest'
import { useLogFormatter } from '@/utils/useLogFormatter'
import type { IApiCallError } from '@/types/errors.ts'

describe('useLogFormatter', () => {
  const {
    formatApiError,
    formatError,
    formatTraceMessage,
    formatDebugMessage,
    formatInfoMessage,
  } = useLogFormatter()

  it('formats API error correctly', () => {
    const error = {
      code: 404,
      title: 'Not Found',
      url: 'https://api.example.com/resource',
      message: 'Resource not found',
    } as IApiCallError

    const result = formatApiError(error)

    expect(result).toMatch(
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3} 404 Not Found Error occured at https:\/\/api\.example\.com\/resource$/,
    )
  })

  it('formats error message correctly', () => {
    const error = 'Something went wrong'
    const result = formatError(error)

    expect(result).toMatch(
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3} Error occured: Something went wrong$/,
    )
  })

  it('handles empty error message gracefully', () => {
    const error = ''
    const result = formatError(error)

    expect(result).toBe('formatError got empty error')
  })

  it('formats trace message correctly', () => {
    const msg = 'This is a trace message'
    const result = formatTraceMessage(msg)

    expect(result).toMatch(
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3} TRACE: This is a trace message$/,
    )
  })

  it('handles empty trace message gracefully', () => {
    const msg = ''
    const result = formatTraceMessage(msg)

    expect(result).toBe('formatTraceMessage got empty message')
  })

  it('formats debug message correctly', () => {
    const msg = 'This is a debug message'
    const result = formatDebugMessage(msg)

    expect(result).toBe('DEBUG: This is a debug message')
  })

  it('handles empty debug message gracefully', () => {
    const msg = ''
    const result = formatDebugMessage(msg)

    expect(result).toBe('formatDebugMessage got empty message')
  })

  it('formats info message correctly', () => {
    const msg = 'This is an info message'
    const result = formatInfoMessage(msg)

    expect(result).toBe('INFO: This is an info message')
  })

  it('handles empty info message gracefully', () => {
    const msg = ''
    const result = formatInfoMessage(msg)

    expect(result).toBe('formatInfoMessage got empty message')
  })
})
