import { defineStore, storeToRefs } from 'pinia'
import { PINIA_STORE_KEYS } from '@/constants.ts'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import {
  type IAdditionalDetails,
  type IHealthAndSafety,
  type ITravelPersonalization,
  type ITravelPreferences,
  ONBOARDING_STEPS,
} from '@/types/user.ts'
import router from '@/router'
import { useUserStore } from '@/stores/user.ts'
import type { TNullable } from '@/types/helpers.ts'

export const useOnboardingStore = defineStore(
  PINIA_STORE_KEYS.ONBOARDING,
  () => {
    const route = useRoute()
    const step = computed(
      () => Number.parseInt(route.params.step as string, 10) || 1,
    )
    const setStep = (s: ONBOARDING_STEPS) =>
      router.push({ path: `/onboarding/${s}` })

    const goBack = () => {
      setStep(step.value - 1)
    }

    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)
    const saveBasicDetails = (details: {
      firstName?: TNullable<string>
      lastName?: TNullable<string>
      birthDate?: TNullable<string>
      gender?: TNullable<number>
    }) => {
      user.value.first_name = details.firstName
      user.value.last_name = details.lastName
      user.value.birth_date = details.birthDate
      user.value.gender_id = details.gender
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
      user.value.preferences.personalization = p
    }

    const saveAdditionalDetails = (ad: IAdditionalDetails) => {
      if (!user.value.preferences) user.value.preferences = {}
      user.value.preferences.additional_details = ad
    }

    const { updateUserProfile } = userStore
    const continueOnboarding = (args: object) => {
      switch (step.value) {
        case ONBOARDING_STEPS.WELCOME:
          saveBasicDetails(args)
          setStep(ONBOARDING_STEPS.TRAVEL_PREFERENCES)
          break
        case ONBOARDING_STEPS.TRAVEL_PREFERENCES:
          saveTravelPreferences(args as ITravelPreferences)
          setStep(ONBOARDING_STEPS.HEALTH_SAFETY)
          break
        case ONBOARDING_STEPS.HEALTH_SAFETY:
          saveHealthSafety(args as IHealthAndSafety)
          setStep(ONBOARDING_STEPS.PERSONALIZATION)
          break
        case ONBOARDING_STEPS.PERSONALIZATION:
          savePersonalization(args as ITravelPersonalization)
          setStep(ONBOARDING_STEPS.ADDITIONAL_DETAILS)
          break
        case ONBOARDING_STEPS.ADDITIONAL_DETAILS:
          saveAdditionalDetails(args as IAdditionalDetails)
          break
      }

      if (step.value === Object.keys(ONBOARDING_STEPS).length) {
        updateUserProfile().then(() => router.push({ name: 'My Profile' }))
      }
    }

    return {
      step,
      goBack,
      continueOnboarding,
    }
  },
)
