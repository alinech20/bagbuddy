<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'

defineProps<{
  title: string
}>()
</script>

<template>
  <section class="searchable-list">
    <div class="searchable-list__header">
      <Icon icon="mdi:left" class="searchable-list__back-icon" />
      <h2 class="searchable-list__title header-5">{{ title }}</h2>
    </div>
  </section>
</template>

<style lang="sass">
.searchable-list
  position: fixed
  inset: 0
  width: 100%
  height: 100dvh
  z-index: 10000
  background-color: var(--background)
</style>
