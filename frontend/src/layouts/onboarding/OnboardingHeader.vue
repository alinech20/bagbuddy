<script setup lang="ts">
import { computed } from 'vue'
import { ONBOARDING_STEPS } from '@/types/user.ts'
import { useOnboardingStore } from '@/stores/onboarding.ts'
import { storeToRefs } from 'pinia'

const { step } = storeToRefs(useOnboardingStore())
const progress = computed(
  () => (step.value / (Object.keys(ONBOARDING_STEPS).length / 2)) * 100,
)
</script>

<template>
  <header>
    <v-progress-linear color="success" height="10" :model-value="progress" />
  </header>
</template>

<style lang="sass">
header
  position: fixed
  top: 0
  left: 0
  right: 0
</style>
