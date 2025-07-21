<template>
  <button class="btn">
    <slot name="icon-before" />
    <slot name="icon" />
    <slot></slot>
    <slot name="icon-after" />
  </button>
</template>

<style lang="sass">
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/colors'
@import '@/assets/sass/vars/sizes'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.btn
  height: $button-height-md
  font-weight: $font-weight-medium
  cursor: pointer
  border-radius: $border-radius-md
  padding: $spacer-sm $spacer-lg
  transition: background-color 0.3s ease
  text-transform: uppercase

  &:hover
    background-color: var(--dirty-background)

  &.btn-primary
    background-color: var(--primary)
    color: white

    &:hover
      background-color: var(--primary-hover)
</style>
