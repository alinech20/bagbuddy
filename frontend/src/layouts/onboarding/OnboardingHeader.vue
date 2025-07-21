<script setup lang="ts">
import { computed } from 'vue'
import { ONBOARDING_STEPS } from '@/types/user.ts'
import { useOnboardingStore } from '@/stores/onboarding.ts'
import { storeToRefs } from 'pinia'

const { step } = storeToRefs(useOnboardingStore())
const progress = computed(() => (step.value / (Object.keys(ONBOARDING_STEPS).length / 2)) * 100)
</script>

<template>
  <header>
    <div class="progress-bar">
      <div class="progress-bar__fill" :style="{ width: progress + '%' }"></div>
    </div>
  </header>
</template>

<style lang="sass">
header
  position: fixed
  top: 0
  left: 0
  right: 0

.progress-bar
  width: 100%
  height: 4px
  background: var(--dirty-background)
  overflow: hidden

.progress-bar__fill
  height: 100%
  background: var(--success)
  transition: width 0.3s
</style>
