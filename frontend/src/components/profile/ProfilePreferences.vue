<script setup lang="ts">
import type { IUser } from '@/types/user'
import { textFormatterUtils } from '@/utils/textFormatterUtils'
import { computed } from 'vue'
import SharedCard from '../shared/SharedCard.vue'
import SharedPill from '../shared/SharedPill.vue'

const props = defineProps<{
  user: IUser
}>()

const preferences = computed(() => {
  return props.user.preferences || {}
})

const fieldsToSkip = ['id', 'created_at', 'updated_at', 'profile_id']
const filterItems = (pref: any) => {
  const filtered = { ...pref }
  fieldsToSkip.forEach((field) => {
    if (filtered[field]) delete filtered[field]
  })

  return filtered
}

const formatValue = (value: any): string[] => {
  if (typeof value === 'boolean') {
    return value ? ['Yes'] : ['No']
  }
  if (!Array.isArray(value)) {
    return [value]
  }

  return value
}

const { snakeToWords } = textFormatterUtils()
</script>

<template>
  <section class="profile__preferences" v-if="preferences">
    <ul class="profile__preferences-list">
      <template v-for="(value, key) in preferences" :key="key">
        <li v-for="(v, k) in filterItems(value)" :key="k" class="profile__preference-item">
          <SharedCard class="profile__preference-card" :title="snakeToWords(k)">
            <template #default>
              <SharedPill v-for="(item, index) in formatValue(v)" :key="index">{{ item }}</SharedPill>
            </template>
          </SharedCard>
        </li>
      </template>
    </ul>
  </section>
</template>

<style lang="sass">
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.profile__preferences
  .profile__preferences-list
    .profile__preference-item
      .profile__preference-card
        margin: $spacer-md 0
        background: var(--dirty-background)
        padding: $spacer-md $spacer-lg
        box-shadow: none

        &:last-of-type
          margin-bottom: 0

        .card__content
          display: flex

          .pill
            margin: $spacer-sm $spacer-sm 0 0
            font-size: $font-size-sm
</style>
