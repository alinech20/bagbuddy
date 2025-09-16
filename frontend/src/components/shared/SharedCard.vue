<script setup lang="ts"></script>

<template>
  <article class="card">
    <header v-if="$slots.title" class="card__title">
      <slot name="icon" />
      <h2 class="card__title-text">
        <slot name="title" />
      </h2>
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
@import '@/assets/sass/vars/colors'
@import '@/assets/sass/vars/shadows'
@import '@/assets/sass/vars/spacers'

.card
  padding: $spacer-md
  border: 1px solid var(--border-primary-light)
  border-radius: $border-radius-md
  box-shadow: $main-shadow
</style>
