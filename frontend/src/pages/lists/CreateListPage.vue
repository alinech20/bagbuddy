<script setup lang="ts">
import { useListStore } from '@/stores/list.ts'

const { saveNewList } = useListStore()
</script>

<template></template>

<style lang="sass">
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.create-list
  padding: $spacer-md

  .create-list-current-step
    margin-bottom: $spacer-md
    font-size: $font-size-sm
    text-align: center

    &__number
      display: inline-block
      border-radius: $border-radius-circle
      background: var(--dirty-background)
      width: 24px
      height: 24px
      text-align: center
      line-height: 24px
      margin-right: $spacer-sm
</style>
