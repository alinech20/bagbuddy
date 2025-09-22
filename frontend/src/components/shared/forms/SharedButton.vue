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
@import '@/assets/sass/vars/sizes'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.btn
  border: none
  outline: none
  font-weight: $font-weight-semibold
  cursor: pointer
  border-radius: $border-radius-lg
  padding: $spacer-md
  transition: background-color 0.3s ease
  color: var(--text-primary-lighter)
  font-size: $font-size-lg
  background-color: transparent

  &:hover
    background-color: var(--dirty-background)

  &.btn-primary
    background-color: var(--primary)
    color: white

    &:hover
      background-color: var(--primary-hover)

  &.btn-secondary
    background-color: var(--secondary)
    color: white

    &:hover
      background-color: var(--secondary-hover)
</style>
