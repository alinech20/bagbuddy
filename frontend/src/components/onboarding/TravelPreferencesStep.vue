<script setup lang="ts">
import { ref } from 'vue'
import {
  type ITravelPreferences,
  TRAVEL_DESTINATIONS,
  TRAVEL_FREQUENCY,
  TRAVEL_TYPES,
} from '@/types/user.ts'
import OnboardingStep from '@/components/onboarding/OnboardingStep.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.ts'

const emits = defineEmits(['nextStep'])
const { user } = storeToRefs(useUserStore())

const frequency = ref<TRAVEL_FREQUENCY>()
const frequencyItems = [...Object.keys(TRAVEL_FREQUENCY)]
const types = ref<TRAVEL_TYPES[]>([])
const typeItems = [...Object.keys(TRAVEL_TYPES)]
const destinations = ref<TRAVEL_DESTINATIONS[]>([])
const destinationItems = [...Object.keys(TRAVEL_DESTINATIONS)]

const nextStep = () => {
  const prefs: ITravelPreferences = {
    travel_frequency: frequency.value,
    travel_types: types.value,
    travel_destinations: destinations.value,
  }

  if (!user.value.preferences) user.value.preferences = {}
  user.value.preferences.travel_preferences = prefs

  emits('nextStep')
}
</script>

<template>
  <OnboardingStep>
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
    <template #actions>
      <v-btn color="background" variant="flat">Skip</v-btn>
      <v-btn color="secondary">Back</v-btn>
      <v-spacer />
      <v-btn @click="nextStep" color="primary">Next</v-btn>
    </template>
  </OnboardingStep>
</template>

<style scoped lang="sass"></style>
