<script setup lang="ts">
defineProps<{
  label: string
  type?: string
  name?: string
  rules?: any[]
  required?: boolean
  errors?: string[]
}>()

defineEmits(['blur', 'focus'])

const model = defineModel()
</script>

<template>
  <div class="form-field">
    <label :for="name">{{ label }}</label>
    <input
      :id="name"
      :type="type || 'text'"
      :name="name"
      v-model="model"
      :required="required"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />
    <ul class="error-list" v-if="errors && errors.length">
      <li v-for="(error, index) in errors" :key="index" class="error">{{ error }}</li>
    </ul>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/colors'
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/typography'

.form-field
  margin-bottom: $spacer-md

  label
    display: block
    margin-bottom: $spacer-sm

  input
    border: 1px solid var(--border-color-primary)
    border-radius: $border-radius-md
    background-color: var(--input-background)
    padding: $spacer-sm
    width: 100%

    &:focus
      border-color: var(--primary)
      outline: none

  .error-list
    margin-top: $spacer-sm
    .error
      list-style-type: none
      color: var(--error)
      font-weight: $font-weight-medium
</style>
