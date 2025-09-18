<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import SharedButton from '@/components/shared/forms/SharedButton.vue'
import { Icon } from '@iconify/vue'

const navItems = [
  { title: 'Pack', icon: 'mdi:luggage', to: 'Create Packing List' },
  { title: 'Profile', icon: 'mdi:account', to: 'My Profile' },
]

const active = ref(navItems.findIndex((item) => item.to === router.currentRoute.value.name))

const navigateTo = (name: string, idx: number) => {
  active.value = idx
  router.push({ name })
}
</script>

<template>
  <nav class="bottom-navigation">
    <SharedButton
      v-for="({ title, icon, to }, idx) in navItems"
      :key="to"
      class="nav-btn"
      :class="{ active: active === idx }"
      @click="navigateTo(to, idx)"
    >
      <template #icon-before>
        <Icon :icon="icon" class="nav-btn__icon" />
      </template>
      {{ title }}
    </SharedButton>
  </nav>
</template>

<style lang="sass">
@import '@/assets/sass/vars/shadows'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.bottom-navigation
  position: fixed
  bottom: 0
  left: 0
  right: 0
  display: flex
  z-index: 1000
  background: white
  height: 80px
  border-top: 1px solid var(--border-light-gray)

  .nav-btn
    background: transparent
    color: var(--text-primary-lightest)
    font-size: $font-size-sm
    height: 100%
    border-radius: 0
    display: flex
    flex: 1
    flex-direction: column
    align-items: center
    cursor: pointer
    transition: background 0.2s

    &.active
      color: var(--primary)
      *
        color: var(--primary)

    &:hover
      background: var(--surface-primary)
      color: var(--primary-hover)

      *
        color: var(--primary-hover)

    &__icon
      font-size: $font-size-3xl
      margin-bottom: $spacer-xs

      > *
        color: var(--text-primary-lightest)
</style>
