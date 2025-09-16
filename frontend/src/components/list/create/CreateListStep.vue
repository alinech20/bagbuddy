<script setup lang="ts">
import SharedCard from '@/components/shared/SharedCard.vue'

defineProps<{
  title?: string
  subtitle?: string
}>()
</script>

<template>
  <SharedCard class="create-list-step">
    <div class="create-list-step__title">
      <h2 v-if="title" class="header-4">{{ title }}</h2>
      <h3 v-if="subtitle" class="header-6">
        <em>{{ subtitle }}</em>
      </h3>
    </div>
    <div class="create-list-step__fields">
      <slot></slot>
    </div>
  </SharedCard>
</template>

<style lang="sass">
@import '@/assets/sass/vars/colors'
@import '@/assets/sass/vars/spacers'

.create-list-step
  max-width: 600px

  &__title
    text-align: center

    h2
      margin-bottom: $spacer-sm

    h3
      margin-bottom: $spacer-xl

  &__fields
    max-width: 400px
    margin: 0 auto
</style>
