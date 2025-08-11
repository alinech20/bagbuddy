<script setup lang="ts"></script>

<template>
  <div class="pill">
    <slot name="icon-before" />
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
  display: inline-block

  &.primary
    background-color: var(--dirty-background)
    color: var(--primary)
</style>
