<script setup lang="ts">
import SharedCard from '@/components/shared/SharedCard.vue'
import CreateListBasicInfo from '@/components/list/create/CreateListBasicInfo.vue'
import type { IList } from '@/types/list.ts'
import CreateListItems from '@/components/list/create/CreateListItems.vue'

defineProps<{
  list: IList
}>()
</script>

<template>
  <section class="create-list">
    <SharedCard class="create-list__basic-details create-list-section">
      <CreateListBasicInfo />
    </SharedCard>
    <CreateListItems class="create-list-section" />
  </section>
</template>

<style lang="sass">
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/shadows'
@import '@/assets/sass/vars/spacers'

.create-list
  input
    padding: $spacer-sm $spacer-md
    border-radius: $border-radius-md

  .card
    box-shadow: $main-tighter-shadow
    background-color: white
    padding: $spacer-md

  &-section:not(:first-child)
    margin-top: $spacer-lg

  &__title
    text-align: center

  &__trip-dates
    display: flex
    justify-content: space-between
    gap: $spacer-md
</style>
