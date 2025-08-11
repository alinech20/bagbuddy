<script setup lang="ts">
import type { IUser } from '@/types/user.ts'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import SharedPill from '@/components/shared/SharedPill.vue'
import UserDetails from '@/components/profile/UserDetails.vue'

const props = defineProps<{
  user: IUser
}>()

const fullName = computed(() => {
  if (!props.user.first_name || !props.user.last_name) return ''
  return `${props.user.first_name} ${props.user.last_name}`
})
</script>

<template>
  <article class="basic-info">
    <div class="basic-info__avatar-wrapper">
      <Icon icon="mdi:account" class="basic-info__avatar" />
    </div>
    <h2 class="basic-info__name">{{ fullName }}</h2>
    <SharedPill class="basic-info__email primary">{{ props.user.email }}</SharedPill>
    <UserDetails class="basic-info__details" :user="user" />
  </article>
</template>

<style lang="sass">
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.basic-info
  background-color: var(--background)
  text-align: center
  border-radius: $border-radius-md
  position: relative
  width: 100%
  margin-top: 68px
  padding: 76px $spacer-md $spacer-md

  &__avatar-wrapper
    background-color: var(--dirty-background)
    border-radius: $border-radius-circle
    border: 4px solid white
    position: absolute
    top: 0
    left: 50%
    transform: translate(-50%, -50%)
    padding: $spacer-md
    width: 120px
    height: 120px
    box-shadow: 0 2px 4px 0 rgba(24, 24, 24, 0.3)

  &__avatar
    width: 100%
    height: 100%

  &__name
    font-size: $font-size-h4
    font-weight: $font-weight-medium

  &__email
    margin-top: $spacer-md

  &__details
    margin-top: $spacer-md
</style>
