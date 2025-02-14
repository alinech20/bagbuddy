<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ONBOARDING_STEPS } from '@/types/user.ts'
import WelcomeStep from '@/components/onboarding/WelcomeStep.vue'
import TravelPreferencesStep from '@/components/onboarding/TravelPreferencesStep.vue'
import router from '@/router'
import { computed } from 'vue'
import HealthSafetyStep from '@/components/onboarding/HealthSafetyStep.vue'

const route = useRoute()
const step = computed(
  () => Number.parseInt(route.params.step as string, 10) || 1,
)

const setStep = (s: ONBOARDING_STEPS) =>
  router.push({ path: `/onboarding/${s}` })
</script>

<template>
  <WelcomeStep
    @next-step="setStep(ONBOARDING_STEPS.TRAVEL_PREFERENCES)"
    v-if="step === ONBOARDING_STEPS.WELCOME"
  />
  <TravelPreferencesStep
    @next-step="setStep(ONBOARDING_STEPS.HEALTH_SAFETY)"
    v-if="step === ONBOARDING_STEPS.TRAVEL_PREFERENCES"
  />
  <HealthSafetyStep
    @next-step="setStep(ONBOARDING_STEPS.PERSONALIZATION)"
    v-if="step === ONBOARDING_STEPS.HEALTH_SAFETY"
  />
</template>
