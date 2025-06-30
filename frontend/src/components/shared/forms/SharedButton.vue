<template>
  <button class="btn">
    <slot name="icon-before" />
    <slot name="icon" />
    <slot></slot>
    <slot name="icon-after" />
  </button>
</template>

<style lang="sass">
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/colors'
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/sizes'

.btn
  height: $button-height-md

  &.btn-primary
    background-color: var(--primary)
    color: var(--on-primary)
    border-radius: $border-radius-md
    padding: $spacer-sm $spacer-lg
    cursor: pointer
    transition: background-color 0.3s ease
</style>
