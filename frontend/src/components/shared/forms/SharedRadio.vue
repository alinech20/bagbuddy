<script setup lang="ts">
import type { IRadioOption } from '@/types/forms.ts'

defineProps<{
  label: string
  name?: string
  options: Array<IRadioOption>
}>()

const model = defineModel<string>()
</script>

<template>
  <div class="radio-group form-field">
    <label class="radio-group__label">{{ label }}</label>
    <div class="radio-group__options-wrapper">
      <div class="radio-group__option" v-for="option in options" :key="option.value" @click="model = option.value">
        <input type="radio" :name="name" :value="option.value" v-model="model" />
        <label class="radio__label" :for="name">
          {{ option.label }}
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/vars/spacers'

.radio-group
  .radio-group__options-wrapper
    .radio-group__option
      display: flex
      align-items: center
      margin-bottom: $spacer-sm
      cursor: pointer

      input
        accent-color: var(--success)
        margin-right: 0.5rem
        cursor: pointer

        width: auto

        &:focus
          border-color: var(--primary)
          outline: none

      label
        margin-bottom: 0
        cursor: pointer
</style>
