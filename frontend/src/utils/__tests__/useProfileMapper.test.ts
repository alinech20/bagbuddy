import { describe, expect, it } from 'vitest'
import { useProfileMapper } from '@/utils/useProfileMapper'

describe('useProfileMapper', () => {
  const { mapFetchResponseToUserInterface } = useProfileMapper()

  it('maps fetch response to user interface correctly', () => {
    const data = {
      travel_preferences: { some: 'data' },
      health_safety: { some: 'data' },
      personalization: { some: 'data' },
      additional_details: { some: 'data' },
      first_name: 'John',
      last_name: 'Doe',
    }

    const result = mapFetchResponseToUserInterface(data)

    expect(result).toEqual({
      first_name: 'John',
      last_name: 'Doe',
      preferences: {
        travel_preferences: { some: 'data' },
        health_safety: { some: 'data' },
        personalization: { some: 'data' },
        additional_details: { some: 'data' },
      },
    })
  })

  it('handles missing optional fields gracefully', () => {
    const data = {
      first_name: 'John',
      last_name: 'Doe',
    }

    const result = mapFetchResponseToUserInterface(data)

    expect(result).toEqual({
      first_name: 'John',
      last_name: 'Doe',
      preferences: {
        travel_preferences: undefined,
        health_safety: undefined,
        personalization: undefined,
        additional_details: undefined,
      },
    })
  })

  it('handles empty data object', () => {
    const data = {}

    const result = mapFetchResponseToUserInterface(data)

    expect(result).toEqual({
      preferences: {
        travel_preferences: undefined,
        health_safety: undefined,
        personalization: undefined,
        additional_details: undefined,
      },
    })
  })
})
