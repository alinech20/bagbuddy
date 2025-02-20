import {
  type IAdditionalDetails,
  type IHealthAndSafety,
  type ITravelPersonalization,
  type ITravelPreferences,
  ONBOARDING_STEPS,
} from '@/types/user.ts'
import { useUserStore } from '@/stores/user.ts'
import router from '@/router'
import { useOnboardingStore } from '@/stores/onboarding.ts'
import { storeToRefs } from 'pinia'

export const useOnboardingLogic = () => {
  const onboardingStore = useOnboardingStore()
  const { step } = storeToRefs(onboardingStore)
  const { setStep } = onboardingStore
  const {
    updateUserProfile,
    saveBasicDetails,
    saveTravelPreferences,
    saveHealthSafety,
    savePersonalization,
    saveAdditionalDetails,
  } = useUserStore()

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

    if (step.value === Object.keys(ONBOARDING_STEPS).length / 2) {
      updateUserProfile().then(() => router.push({ name: 'My Profile' }))
    }
  }

  return {
    continueOnboarding,
  }
}
