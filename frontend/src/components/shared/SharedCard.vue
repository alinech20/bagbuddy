<script setup lang="ts">
defineProps<{
  icon?: string
  title?: string
  tag?: string | HTMLElement
}>()
</script>

<template>
  <article class="card">
    <header v-if="$slots.title || title" class="card__title">
      <div class="left">
        <slot name="icon" v-if="icon">{{ icon }}</slot>
        <div class="card__title-text">
          <slot name="title">
            <component :is="tag || 'h2'" class="paragraph-1">{{ title }}</component>
          </slot>
        </div>
      </div>
      <div class="right" v-if="$slots['title-button']">
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
@import '@/assets/sass/vars/typography'

.card
  padding: $spacer-xl $spacer-md
  border: 1px solid var(--border-primary-light)
  border-radius: $border-radius-lg
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
        font-weight: $font-weight-bold

        h2
          color: var(--text-primary-light)
          font-weight: $font-weight-bold
</style>
