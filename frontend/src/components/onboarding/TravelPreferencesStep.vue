<script setup lang="ts">
import { ref } from 'vue'
import {
  TRAVEL_DESTINATIONS,
  TRAVEL_FREQUENCY,
  TRAVEL_TYPES,
} from '@/types/user.ts'
import OnboardingStep from '@/components/onboarding/OnboardingStep.vue'
import { useOnboardingStore } from '@/stores/onboarding.ts'

const frequency = ref<TRAVEL_FREQUENCY>()
const frequencyItems = [...Object.keys(TRAVEL_FREQUENCY)]
const types = ref<TRAVEL_TYPES[]>([])
const typeItems = [...Object.keys(TRAVEL_TYPES)]
const destinations = ref<TRAVEL_DESTINATIONS[]>([])
const destinationItems = [...Object.keys(TRAVEL_DESTINATIONS)]

const { continueOnboarding, goBack } = useOnboardingStore()

const nextStep = () => {
  continueOnboarding({
    travel_frequency: frequency.value,
    travel_types: types.value,
    travel_destinations: destinations.value,
  })
}
</script>

<template>
  <OnboardingStep @next="nextStep" @prev="goBack">
    <template #title>Travel Preferences</template>
    <template #description>
      Great! Now let's talk about your travel preferences. This will help us
      tailor your packing lists to your needs.
    </template>
    <template #form>
      <v-form>
        <v-select
          v-model="frequency"
          :items="frequencyItems"
          label="Travel frequency"
          :list-props="{
            bgColor: 'white',
            density: 'compact',
          }"
        />
        <v-select
          v-model="types"
          :items="typeItems"
          :list-props="{
            bgColor: 'white',
            density: 'compact',
          }"
          label="Travel type"
          multiple
        />
        <v-select
          v-model="destinations"
          :items="destinationItems"
          :list-props="{
            bgColor: 'white',
            density: 'compact',
          }"
          label="Destinations"
          multiple
        />
      </v-form>
    </template>
  </OnboardingStep>
</template>
