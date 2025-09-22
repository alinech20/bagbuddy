<script setup lang="ts">
import type { IUser } from '@/types/user'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  user: IUser
  own?: boolean
}>()

const userFullName = computed(() => {
  return `${props.user.first_name} ${props.user.last_name}`
})
</script>

<template>
  <div class="profile__head">
    <div class="profile__avatar-wrapper">
      <Icon icon="mdi:account" class="profile__avatar" />
    </div>
    <div class="profile__info">
      <h2 class="profile__name header-5">{{ userFullName }}</h2>
      <h3 class="profile__email paragraph-2" v-if="own">{{ user.email }}</h3>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.profile__head
  text-align: center

  .profile__avatar-wrapper
    width: 100px
    height: 100px
    border: 3px solid var(--surface-primary)
    border-radius: $border-radius-circle
    margin: 0 auto

    .profile__avatar
      width: 100%
      height: 100%
      padding: $spacer-md

  .profile__info
    margin-top: $spacer-md

    .profile__name
      font-weight: $font-weight-semibold

    .profile__email
      margin-top: $spacer-xs
      color: var(--text-primary-lighter)
</style>
