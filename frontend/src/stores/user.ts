import { defineStore } from 'pinia'
import { ref } from 'vue'
import { PINIA_STORE_KEYS } from '@/constants.ts'
import type {
  IAdditionalDetails,
  IHealthAndSafety,
  ITravelPersonalization,
  ITravelPreferences,
  IUser,
} from '@/types/user.ts'
import { useProfileService } from '@/services/profile.ts'
import { useLogger } from '@/composables/useLogger.ts'
import type { TNullable } from '@/types/helpers.ts'
import { useProfileMapper } from '@/utils/useProfileMapper.ts'
import type { User } from 'firebase/auth'

export const useUserStore = defineStore(PINIA_STORE_KEYS.USER, () => {
  const { trace, debug } = useLogger()
  const user = ref<IUser>({} as IUser)
  const { updateOwn } = useProfileService()

  const setUser = (u: IUser) => {
    trace('Setting user data')
    user.value = u
    delete user.value.firebase_data // Keep this removed for now
  }

  const clearUser = () => {
    trace('Clearing user data')
    user.value = {} as IUser
  }

  const updateUserProfile = async () => {
    trace('Updating user default')
    if (!Object.keys(user.value).length) return

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

    user.value.onboarded = true
  }

  const saveBasicDetails = (details: {
    firstName: string
    lastName: string
    birthDate?: TNullable<string>
    gender?: TNullable<string>
  }) => {
    user.value.first_name = details.firstName
    user.value.last_name = details.lastName
    user.value.birth_date = details.birthDate
    user.value.gender = details.gender
  }

  const saveTravelPreferences = (prefs: ITravelPreferences) => {
    if (!user.value.preferences) user.value.preferences = {}
    user.value.preferences.travel_preferences = prefs
  }

  const saveHealthSafety = (hs: IHealthAndSafety) => {
    if (!user.value.preferences) user.value.preferences = {}
    user.value.preferences.health_safety = hs
  }

  const savePersonalization = (p: ITravelPersonalization) => {
    if (!user.value.preferences) user.value.preferences = {}
    user.value.preferences.travel_personalization = p
  }

  const saveAdditionalDetails = (ad: IAdditionalDetails) => {
    if (!user.value.preferences) user.value.preferences = {}
    user.value.preferences.additional_details = ad
  }

  const getAndSetUser = async (u: User) => {
    const data = await useProfileService().getOwn()
    const mappedResponse =
      useProfileMapper().mapFetchResponseToUserInterface(data)

    setUser({
      ...mappedResponse,
      firebase_data: u,
    })

    return user.value
  }

  return {
    user,
    setUser,
    clearUser,
    updateUserProfile,
    saveBasicDetails,
    saveTravelPreferences,
    saveHealthSafety,
    savePersonalization,
    saveAdditionalDetails,
    getAndSetUser,
  }
})
