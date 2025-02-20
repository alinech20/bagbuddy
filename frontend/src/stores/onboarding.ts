import { defineStore } from 'pinia'
import { PINIA_STORE_KEYS } from '@/constants.ts'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { ONBOARDING_STEPS } from '@/types/user.ts'
import router from '@/router'

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

    return {
      step,
      setStep,
      goBack,
    }
  },
)
