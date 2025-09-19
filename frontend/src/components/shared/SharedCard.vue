<script setup lang="ts">
defineProps<{
  icon?: string
  title?: string
}>()
</script>

<template>
  <article class="card">
    <header v-if="$slots.title || title" class="card__title">
      <div class="left">
        <slot name="icon" v-if="icon">{{ icon }}</slot>
        <h2 class="card__title-text paragraph-1">
          <slot name="title" v-if="title">{{ title }}</slot>
        </h2>
      </div>
      <div class="right">
        <slot name="title-button" />
      </div>
    </header>
    <div class="card__content">
      <slot></slot>
    </div>
    <footer v-if="$slots.actions" class="card__actions">
      <slot name="actions" />
    </footer>
  </article>
</template>

<style lang="sass">
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/shadows'
@import '@/assets/sass/vars/spacers'

.card
  padding: $spacer-xl $spacer-md
  border: 1px solid var(--border-primary-light)
  border-radius: $border-radius-xl
  box-shadow: $main-shadow

  .card__title
    display: flex
    justify-content: space-between

    .left
      display: flex
      align-items: center
      gap: $spacer-sm

      .card__title-text
        color: var(--text-primary-light)
</style>
