<script setup lang="ts">
import SharedButton from '@/components/shared/forms/SharedButton.vue'

defineProps<{
  steps: number
  currentStep: number
  allowSkip?: boolean
  separateFinish?: boolean
}>()
defineEmits(['skip', 'prev', 'next', 'done'])
</script>

<template>
  <section class="progression-buttons">
    <div class="left">
      <SharedButton v-if="allowSkip" @click="$emit('skip')">Skip</SharedButton>
      <SharedButton v-if="currentStep !== 1" class="btn-secondary" @click="$emit('prev')">Back </SharedButton>
    </div>
    <div class="right">
      <SharedButton v-if="currentStep !== steps" class="btn-primary" @click="$emit('next')">Next</SharedButton>
      <SharedButton v-else-if="separateFinish" class="btn-primary" @click="$emit('done')">Finish</SharedButton>
    </div>
  </section>
</template>

<style lang="sass">
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/spacers'

.progression-buttons
  text-align: initial
  display: flex
  justify-content: space-between
  margin: $spacer-md 0

  button
    padding: $spacer-sm $spacer-lg
    border-radius: $border-radius-md
</style>
