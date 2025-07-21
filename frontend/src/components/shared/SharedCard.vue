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
@import '@/assets/sass/vars/spacers'

.card
  padding: $spacer-md
  border-radius: $border-radius-md
  box-shadow: 0 2px 4px -1px rgba(24, 24, 24, 0.3)
</style>
