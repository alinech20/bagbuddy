<script setup lang="ts">
import OnboardingStep from '@/components/onboarding/OnboardingStep.vue'
import { PREFERRED_ACTIVITIES, WEATHER_PREFERENCES } from '@/types/user.ts'
import { ref } from 'vue'
import { useOnboardingStore } from '@/stores/onboarding.ts'
import { useOnboardingLogic } from '@/composables/useOnboardingLogic.ts'
import SharedSelect from '@/components/shared/forms/SharedSelect.vue'

const activities = ref<PREFERRED_ACTIVITIES[]>([])
const activitiesItems = [...Object.values(PREFERRED_ACTIVITIES)]

const weather = ref<WEATHER_PREFERENCES>()
const weatherItems = [...Object.values(WEATHER_PREFERENCES)]

const { goBack } = useOnboardingStore()
const { continueOnboarding } = useOnboardingLogic()

const nextStep = () => {
  continueOnboarding({
    favorite_activities: activities.value,
    weather_preference: weather.value,
  })
}
</script>

<template>
  <OnboardingStep @next="nextStep" @prev="goBack">
    <template #title>Personalization</template>
    <template #description>
      Let's make your BagBuddy experience even better by adding a personal touch to your packing lists
    </template>
    <template #form>
      <form>
        <SharedSelect v-model="activities" :options="activitiesItems" label="Favorite activities" multiple />
        <SharedSelect v-model="weather" :options="weatherItems" label="Weather preference" />
      </form>
    </template>
  </OnboardingStep>
</template>
