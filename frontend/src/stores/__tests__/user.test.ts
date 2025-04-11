import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '@/stores/user'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useLogger } from '@/composables/useLogger'
import { useProfileService } from '@/services/profile'
import type { IUser } from '@/types/user.ts'

vi.mock('@/composables/useLogger', () => {
  return {
    useLogger: () => ({
      info: vi.fn(),
      debug: vi.fn(),
    }),
  }
})

vi.mock('@/services/profile', () => {
  return {
    useProfileService: () => ({
      updateOwn: vi.fn(),
    }),
  }
})

describe('useUserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const { info, debug } = useLogger()
  const { updateOwn } = useProfileService()

  it('sets user data correctly', () => {
    const store = useUserStore()
    const user = { first_name: 'John', last_name: 'Doe' } as IUser
    store.setUser(user)
    expect(store.user).toEqual(user)
  })

  it('clears user data correctly', () => {
    const store = useUserStore()
    store.clearUser()
    expect(store.user).toEqual({})
  })

  it('updates user default correctly', async () => {
    const store = useUserStore()
    store.user = {
      first_name: 'John',
      last_name: 'Doe',
      preferences: {},
    } as IUser
    await store.updateUserProfile()
    expect(store.user.onboarded).toBe(true)
  })

  it('handles empty user data gracefully', async () => {
    const store = useUserStore()
    store.user = {} as IUser
    await store.updateUserProfile()
    expect(updateOwn).not.toHaveBeenCalled()
    expect(debug).not.toHaveBeenCalled()
  })
})
