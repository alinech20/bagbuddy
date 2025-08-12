<script setup lang="ts"></script>

<template>
  <div class="pill">
    <span class="pill__icon" v-if="$slots['icon-before']()">
      <slot name="icon-before" />
    </span>
    <slot />
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.pill
  padding: $spacer-xs $spacer-md
  border-radius: $border-radius-pill
  font-size: $font-size-md
  margin: 0 auto
  display: flex
  align-items: center
  justify-content: space-between
  width: fit-content

  &.primary
    background-color: var(--dirty-background)
    color: var(--primary)

  &__icon
    display: flex
    font-size: $font-size-lg
    padding-right: $spacer-sm
</style>
