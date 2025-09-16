<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import type { ISelectOption, TSelectOption } from '@/types/forms.ts'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  label: string
  name?: string
  options: Array<TSelectOption>
  rules?: any[]
  required?: boolean
  errors?: string[]
  multiple?: boolean
}>()

const emit = defineEmits(['blur', 'focus'])

const model = defineModel<any>()

const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const parsedOptions = computed<ISelectOption[]>(() => {
  return typeof props.options[0] === 'string'
    ? props.options.map((option) => ({ label: option, value: option }))
    : (props.options as ISelectOption[])
})

// Ensure model is always an array if multiple
watchEffect(() => {
  if (props.multiple && !Array.isArray(model.value)) {
    model.value = []
  }
})

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
  if (dropdownOpen.value) emit('focus')
  else emit('blur')
}

function closeDropdown() {
  dropdownOpen.value = false
  emit('blur')
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

function isSelected(optionValue: any): boolean {
  if (props.multiple) {
    return Array.isArray(model.value) && model.value.includes(optionValue)
  }
  return model.value === optionValue
}

function selectOption(option: ISelectOption) {
  if (props.multiple) {
    const index = model.value.findIndex((v: any) => v === option.value)
    if (index === -1) {
      model.value.push(option.value)
    } else {
      model.value.splice(index, 1)
    }
  } else {
    model.value = option.value
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="form-field form-field--select" ref="dropdownRef">
    <label :for="name">{{ label }} <span v-if="required">*</span></label>

    <div class="shared-select" :class="{ open: dropdownOpen }" @click="toggleDropdown">
      <template v-if="multiple">
        <span v-if="model?.length">{{ model.join(', ') }}</span>
        <span v-else class="placeholder">Select...</span>
      </template>
      <template v-else>
        <span v-if="model">{{ parsedOptions.find((opt) => opt.value === model)?.label }}</span>
        <span v-else class="placeholder">-- None --</span>
      </template>
      <Icon icon="mdi:chevron-down" class="dropdown-icon" />
    </div>

    <div class="dropdown-options" :class="{ open: dropdownOpen }">
      <div
        v-for="option in parsedOptions"
        :key="option.value || option.label"
        class="dropdown-option"
        @click.stop="selectOption(option)"
      >
        <template v-if="multiple">
          <input type="checkbox" :checked="isSelected(option.value)" />
          <label>{{ option.label }}</label>
        </template>
        <template v-else>
          {{ option.label }}
        </template>
      </div>
    </div>

    <ul class="error-list" v-if="errors && errors.length">
      <li v-for="(error, index) in errors" :key="index" class="error">{{ error }}</li>
    </ul>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/spacers'

.form-field
  &--select
    position: relative
    cursor: pointer

  .shared-select
    display: flex
    justify-content: space-between
    align-items: center
    border: 1px solid var(--border-color-primary)
    border-radius: $border-radius-md
    background-color: var(--input-background)
    padding: $spacer-sm
    width: 100%

    .dropdown-icon
      transition: transform 0.2s ease-in-out
      font-size: 1.2em

    &.open
      .dropdown-icon
        transform: rotate(180deg)

  .dropdown-options
    position: absolute
    top: calc(100% + $spacer-xs)
    left: 0
    right: 0
    background-color: white
    border-radius: $border-radius-sm
    z-index: 10
    height: auto
    max-height: 0
    overflow-y: auto
    transition: max-height 0.2s ease-in-out

    &.open
      border: 1px solid var(--border-color-primary)
      max-height: 220px

  .dropdown-option
    padding: $spacer-sm
    cursor: pointer
    display: flex
    align-items: center
    gap: $spacer-xs

    input
      width: auto
      cursor: pointer

    label
      margin-bottom: 0
      margin-left: $spacer-xs
      cursor: pointer

    &:hover
      background-color: var(--dirty-background)
</style>
