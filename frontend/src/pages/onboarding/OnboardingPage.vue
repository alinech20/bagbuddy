<script setup lang="ts">
import { ONBOARDING_STEPS } from '@/types/user.ts'
import WelcomeStep from '@/components/onboarding/WelcomeStep.vue'
import TravelPreferencesStep from '@/components/onboarding/TravelPreferencesStep.vue'
import HealthSafetyStep from '@/components/onboarding/HealthSafetyStep.vue'
import { useOnboardingStore } from '@/stores/onboarding.ts'
import { storeToRefs } from 'pinia'

const onboardingStore = useOnboardingStore()
const { goBack, continueOnboarding } = onboardingStore
const { step } = storeToRefs(onboardingStore)
</script>

<template>
  <WelcomeStep
    @next-step="continueOnboarding"
    v-if="step === ONBOARDING_STEPS.WELCOME"
  />
  <TravelPreferencesStep
    @prev-step="goBack"
    @next-step="continueOnboarding"
    v-if="step === ONBOARDING_STEPS.TRAVEL_PREFERENCES"
  />
  <HealthSafetyStep
    @prev-step="goBack"
    @next-step="continueOnboarding"
    v-if="step === ONBOARDING_STEPS.HEALTH_SAFETY"
  />
</template>
