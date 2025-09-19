<script setup lang="ts">
defineProps<{
  label: string
  type?: string
  name?: string
  rules?: any[]
  required?: boolean
  errors?: string[]
  max?: string | number
  textarea?: boolean
  lines?: number
}>()

defineEmits(['blur', 'focus'])

const model = defineModel<any>()
</script>

<template>
  <div class="form-field">
    <label :for="name">{{ label }}</label>
    <input
      v-if="!textarea"
      :id="name"
      :type="type || 'text'"
      :name="name"
      v-model="model"
      :required="required"
      :max="max"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />
    <textarea
      v-else
      :id="name"
      :name="name"
      v-model="model"
      :required="required"
      :rows="lines || 3"
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
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/typography'

.form-field
  margin-bottom: $spacer-md

  label
    display: block
    margin-bottom: $spacer-sm
    color: var(--text-primary-lighter)
    font-size: $font-size-md

  input, textarea
    border: none
    outline: none
    border-radius: $border-radius-lg
    background-color: var(--input-background)
    padding: $spacer-md
    width: 100%

    &:focus
      outline: 1px solid var(--primary)

  textarea
    resize: none

  .error-list
    margin-top: $spacer-sm

    .error
      list-style-type: none
      color: var(--error)
      font-weight: $font-weight-medium
</style>
