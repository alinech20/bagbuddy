<script setup lang="ts">
import OnboardingStep from '@/components/onboarding/OnboardingStep.vue'
import { ref } from 'vue'
import { TRANSPORT_TYPES } from '@/types/user.ts'
import { useOnboardingStore } from '@/stores/onboarding.ts'

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
const transportItems = [...Object.keys(TRANSPORT_TYPES)]

const { continueOnboarding, goBack } = useOnboardingStore()

const nextStep = () => {
  continueOnboarding({
    allergies: allergies.value,
    transport: transport.value,
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
          label="Allergies"
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
          label="Travel type"
        />
      </v-form>
    </template>
  </OnboardingStep>
</template>
