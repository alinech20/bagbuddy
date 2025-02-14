<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ONBOARDING_STEPS } from '@/types/user.ts'

const route = useRoute()
const step = computed(
  () => Number.parseInt(route.params.step as string, 10) || 1,
)
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
