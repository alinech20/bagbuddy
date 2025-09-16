<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import SharedButton from '@/components/shared/forms/SharedButton.vue'
import { Icon } from '@iconify/vue'

const navItems = [
  { title: 'List', icon: 'mdi:playlist-plus', to: 'Create Packing List' },
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
@import '@/assets/sass/vars/colors'
@import '@/assets/sass/vars/shadows'
@import '@/assets/sass/vars/typography'

.bottom-navigation
  position: fixed
  bottom: 0
  left: 0
  right: 0
  display: flex
  background: var(--primary)
  z-index: 1000
  height: 60px
  box-shadow: $upper-darker-tighter-shadow

  .nav-btn
    background: transparent
    color: var(--on-primary)
    font-size: $font-size-xs
    height: 100%
    border-radius: 0
    display: flex
    flex: 1
    flex-direction: column
    align-items: center
    cursor: pointer
    transition: background 0.2s

    &:hover
      background: var(--primary-hover)

    &.active
      background: var(--secondary)

    &__icon
      color: var(--on-primary)
      font-size: $font-size-3xl

      > *
        color: var(--on-primary)
</style>
