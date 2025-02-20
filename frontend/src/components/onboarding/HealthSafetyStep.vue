<script setup lang="ts">
import OnboardingStep from '@/components/onboarding/OnboardingStep.vue'
import { ref } from 'vue'
import { TRANSPORT_TYPES } from '@/types/user.ts'
import { useOnboardingStore } from '@/stores/onboarding.ts'
import { useOnboardingLogic } from '@/composables/useOnboardingLogic.ts'

const allergies = ref<boolean>()
const allergiesItems = [
  {
    title: 'Yes',
    value: true,
  },
  {
    title: 'No',
    value: false,
  },
]

const transport = ref<TRANSPORT_TYPES>()
const transportItems = [...Object.values(TRANSPORT_TYPES)]

const { goBack } = useOnboardingStore()
const { continueOnboarding } = useOnboardingLogic()

const nextStep = () => {
  continueOnboarding({
    allergies: allergies.value,
    preferred_transport: transport.value,
  })
}
</script>

<template>
  <OnboardingStep @next="nextStep" @prev="goBack">
    <template #title>Health & Safety</template>
    <template #description>
      Let's make sure we cover your health and safety needs:
    </template>
    <template #form>
      <v-form>
        <v-select
          v-model="allergies"
          :items="allergiesItems"
          label="Do you have any allergies?"
          :list-props="{
            bgColor: 'white',
            density: 'compact',
          }"
        />
        <v-select
          v-model="transport"
          :items="transportItems"
          :list-props="{
            bgColor: 'white',
            density: 'compact',
          }"
          label="Preferred transportation"
        />
      </v-form>
    </template>
  </OnboardingStep>
</template>
