<script setup lang="ts">
import OnboardingStep from '@/components/onboarding/OnboardingStep.vue'
import { PREFERRED_ACTIVITIES, WEATHER_PREFERENCES } from '@/types/user.ts'
import { ref } from 'vue'
import { useOnboardingStore } from '@/stores/onboarding.ts'

const activities = ref<PREFERRED_ACTIVITIES[]>([])
const activitiesItems = [...Object.keys(PREFERRED_ACTIVITIES)]

const weather = ref<WEATHER_PREFERENCES>()
const weatherItems = [...Object.keys(WEATHER_PREFERENCES)]

const { continueOnboarding, goBack } = useOnboardingStore()

const nextStep = () => {
  continueOnboarding({
    favorite_activities: activities.value,
    weather_preferences: weather.value,
  })
}
</script>

<template>
  <OnboardingStep @next="nextStep" @prev="goBack">
    <template #title>Personalization</template>
    <template #description>
      Let's make your BagBuddy experience even better by adding a personal touch
      to your packing lists:
    </template>
    <template #form>
      <v-form>
        <v-select
          v-model="activities"
          :items="activitiesItems"
          label="Favorite activities"
          :list-props="{
            bgColor: 'white',
            density: 'compact',
          }"
          multiple
        />
        <v-select
          v-model="weather"
          :items="weatherItems"
          label="Weather preference"
          :list-props="{
            bgColor: 'white',
            density: 'compact',
          }"
        />
        />
      </v-form>
    </template>
  </OnboardingStep>
</template>
