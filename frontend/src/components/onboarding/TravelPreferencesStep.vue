<script setup lang="ts">
import { ref } from 'vue'
import { TRAVEL_DESTINATIONS, TRAVEL_FREQUENCY, TRAVEL_PURPOSES } from '@/types/user.ts'
import OnboardingStep from '@/components/onboarding/OnboardingStep.vue'
import { useOnboardingStore } from '@/stores/onboarding.ts'
import { useOnboardingLogic } from '@/composables/useOnboardingLogic.ts'
import SharedSelect from '@/components/shared/forms/SharedSelect.vue'

const frequency = ref<TRAVEL_FREQUENCY>()
const frequencyItems = [...Object.values(TRAVEL_FREQUENCY)]
const types = ref<TRAVEL_PURPOSES[]>([])
const typeItems = [...Object.values(TRAVEL_PURPOSES)]
const destinations = ref<TRAVEL_DESTINATIONS[]>([])
const destinationItems = [...Object.values(TRAVEL_DESTINATIONS)]

const { goBack } = useOnboardingStore()
const { continueOnboarding } = useOnboardingLogic()

const nextStep = () => {
  continueOnboarding({
    frequency: frequency.value,
    purpose: types.value,
    destinations: destinations.value,
  })
}
</script>

<template>
  <OnboardingStep @next="nextStep" @prev="goBack">
    <template #title>Travel Preferences</template>
    <template #description>
      Great! Now let's talk about your travel preferences. This will help us tailor your packing lists to your needs
    </template>
    <template #form>
      <form>
        <SharedSelect v-model="frequency" :options="frequencyItems" label="How often do you travel?" />
        <SharedSelect v-model="types" :options="typeItems" label="Preferred travel types" multiple />
        <SharedSelect
          v-model="destinations"
          :options="destinationItems"
          label="Favorite travel destinations"
          multiple
        />
      </form>
    </template>
  </OnboardingStep>
</template>
