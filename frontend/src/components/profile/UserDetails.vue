<script setup lang="ts">
import type { IUser } from '@/types/user.ts'
import { computed, ref } from 'vue'
import { textFormatterUtils } from '@/utils/textFormatterUtils.ts'

const props = defineProps<{
  user: IUser
}>()

const preferences = computed(() => {
  return props.user.preferences || []
})

const fieldsToSkip = ['id', 'profile_id', 'created_at', 'updated_at']
const filterItems = (pref: any) => {
  const filtered = { ...pref }
  fieldsToSkip.forEach((field) => {
    if (filtered[field]) delete filtered[field]
  })

  return filtered
}

const formatValue = (value: any): string => {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }
  if (Array.isArray(value)) {
    return value.join(', ')
  }
  return value
}

const { snakeToWords } = textFormatterUtils()
const panel = ref<string>('')
</script>

<template>
  <section class="user-details">
    <h3 class="user-details__title">Travel Details</h3>
    <ul class="user-details__list">
      <template v-for="(value, key) in preferences" :key="key">
        <li v-for="(v, k) in filterItems(value)" :key="k" class="user-details__item">
          <span class="user-details__label">{{ snakeToWords(k) }}: </span>
          <span class="user-details__value">{{ formatValue(v) }}</span>
        </li>
      </template>
    </ul>
  </section>
</template>

<style lang="sass">
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.user-details
  text-align: left

  &__title
    font-size: $font-size-xl
    font-weight: $font-weight-medium

  &__list
    margin-top: $spacer-md

  &__item
    padding: $spacer-sm 0
    border-bottom: 1px solid var(--dirty-background)

    &:last-of-type
      border-bottom: none

  &__label
    font-weight: $font-weight-medium
</style>
