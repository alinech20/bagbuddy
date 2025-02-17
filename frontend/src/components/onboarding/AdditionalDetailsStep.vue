<script setup lang="ts">
import OnboardingStep from '@/components/onboarding/OnboardingStep.vue'
import { TRAVEL_COMPANIONS } from '@/types/user.ts'
import { ref } from 'vue'
import { useOnboardingStore } from '@/stores/onboarding.ts'

const companions = ref<TRAVEL_COMPANIONS[]>([])
const companionsItems = [...Object.keys(TRAVEL_COMPANIONS)]

const { continueOnboarding, goBack } = useOnboardingStore()

const nextStep = () => {
  continueOnboarding({
    travel_companions: companions.value,
  })
}
</script>

<template>
  <OnboardingStep @next="nextStep" @prev="goBack">
    <template #title>Additional Details</template>
    <template #description> Almost there! Just a few more things:</template>
    <template #form>
      <v-form>
        <v-select
          v-model="companions"
          :items="companionsItems"
          label="Usual companions"
          :list-props="{
            bgColor: 'white',
            density: 'compact',
          }"
          multiple
        />
      </v-form>
    </template>
  </OnboardingStep>
</template>
