<script setup lang="ts">
import { ONBOARDING_STEPS } from '@/types/user.ts'
import WelcomeStep from '@/components/onboarding/WelcomeStep.vue'
import TravelPreferencesStep from '@/components/onboarding/TravelPreferencesStep.vue'
import HealthSafetyStep from '@/components/onboarding/HealthSafetyStep.vue'
import PersonalizationStep from '@/components/onboarding/PersonalizationStep.vue'
import AdditionalDetailsStep from '@/components/onboarding/AdditionalDetailsStep.vue'
import { useOnboardingStore } from '@/stores/onboarding.ts'
import { storeToRefs } from 'pinia'
import type { ComputedRef } from 'vue'

const step = storeToRefs(
  useOnboardingStore(),
) as unknown as ComputedRef<ONBOARDING_STEPS>
</script>

<template>
  <WelcomeStep v-if="step === ONBOARDING_STEPS.WELCOME" />
  <TravelPreferencesStep
    v-else-if="step === ONBOARDING_STEPS.TRAVEL_PREFERENCES"
  />
  <HealthSafetyStep v-else-if="step === ONBOARDING_STEPS.HEALTH_SAFETY" />
  <PersonalizationStep v-else-if="step === ONBOARDING_STEPS.PERSONALIZATION" />
  <AdditionalDetailsStep
    v-else-if="step === ONBOARDING_STEPS.ADDITIONAL_DETAILS"
  />
</template>
