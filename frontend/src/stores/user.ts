import { defineStore } from 'pinia'
import { ref } from 'vue'
import { PINIA_STORE_KEYS } from '@/constants.ts'
import type { IUser } from '@/types/user.ts'
import { useProfileService } from '@/services/profile.ts'
import { useLogger } from '@/composables/useLogger.ts'

export const useUserStore = defineStore(PINIA_STORE_KEYS.USER, () => {
  const { info, debug } = useLogger()
  const user = ref<IUser>({} as IUser)
  const { updateOwn } = useProfileService()

  const setUser = (u: IUser) => {
    info('Setting user data')
    user.value = u
  }

  const clearUser = () => {
    info('Clearing user data')
    user.value = {} as IUser
  }

  const updateUserProfile = async () => {
    info('Updating user profile')

    const payload = {
      first_name: user.value.first_name,
      last_name: user.value.last_name,
      birth_date: user.value.birth_date,
      gender: user.value.gender,
      onboarded: true,
      ...user.value.preferences,
    }

    debug(JSON.stringify(payload, null, 2))

    await updateOwn(payload)
  }

  return { user, setUser, clearUser, updateUserProfile }
})
