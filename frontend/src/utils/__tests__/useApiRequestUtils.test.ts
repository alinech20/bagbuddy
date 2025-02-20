import { useApiRequestUtils } from '@/utils/useApiRequestUtils'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/composables/useLogger', () => {
  return {
    useLogger: () => ({
      info: vi.fn(),
      debug: vi.fn(),
    }),
  }
})

describe('useApiRequestUtils', () => {
  const { replaceEndpointPlaceholders, addQueryParams } = useApiRequestUtils()

  it('replaces endpoint placeholders correctly', () => {
    const url = '/api/resource/{id}'
    const params = { id: '123' }
    const result = replaceEndpointPlaceholders({ url, params })
    expect(result).toBe('/api/resource/123')
  })

  it('returns url unchanged if no params provided', () => {
    const url = '/api/resource'
    const result = replaceEndpointPlaceholders({ url, params: undefined })
    expect(result).toBe(url)
  })

  it('throws error if params object is empty', () => {
    const url = '/api/resource/{id}'
    expect(() =>
      replaceEndpointPlaceholders({
        url,
        params: {},
      }),
    ).toThrow('params is empty object at replaceEndpointPlaceholders')
  })

  it('throws error if param is invalid', () => {
    const url = '/api/resource/{id}'
    const params = { invalid: '123' }
    expect(() =>
      replaceEndpointPlaceholders({
        url,
        params,
      }),
    ).toThrow('Invalid param at replaceEndpointPlaceholders')
  })

  it('removes unmatched placeholders from url', () => {
    const url = '/api/resource/{id}/{unused}'
    const params = { id: '123' }
    const result = replaceEndpointPlaceholders({ url, params })
    expect(result).toBe('/api/resource/123/')
  })

  it('adds query params correctly', () => {
    const url = '/api/resource'
    const query = { search: 'test', page: '1' }
    const result = addQueryParams({ url, query })
    expect(result).toBe('/api/resource?search=test&page=1')
  })

  it('returns url unchanged if no query provided', () => {
    const url = '/api/resource'
    const result = addQueryParams({ url, query: undefined })
    expect(result).toBe(url)
  })

  it('throws error if query object is empty', () => {
    const url = '/api/resource'
    expect(() =>
      addQueryParams({
        url,
        query: {},
      }),
    ).toThrow('query is empty object at addQueryParams')
  })

  it('removes unmatched placeholders from url with query params', () => {
    const url = '/api/resource/{unused}'
    const query = { search: 'test' }
    const result = addQueryParams({ url, query })
    expect(result).toBe('/api/resource/?search=test')
  })
})
