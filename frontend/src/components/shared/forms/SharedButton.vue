<template>
  <button class="btn">
    <slot name="icon-before" />
    <slot name="icon" />
    <span v-if="$slots.default"><slot /></span>
    <slot name="icon-after" />
  </button>
</template>

<style lang="sass">
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/sizes'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.btn
  display: inline-flex
  align-items: center
  gap: $spacer-sm
  border: none
  outline: none
  font-weight: $font-weight-semibold
  cursor: pointer
  border-radius: $border-radius-lg
  padding: $spacer-md
  transition: background-color 0.2s ease
  font-size: $font-size-lg
  background-color: transparent

  span
    margin-top: $spacer-2xs

  *
    transition: color 0.2s ease
    color: var(--text-primary-lighter)
    line-height: 1

  &:hover
    background-color: var(--dirty-background)

  svg
    display: block
    width: 1em
    height: 1em
    font-size: 1em
    vertical-align: middle

  &.btn-primary
    background-color: var(--primary)

    *
      color: white

    &:hover
      background-color: var(--primary-hover)

  &.btn-secondary
    background-color: var(--secondary)

    *
      color: white

    &:hover
      background-color: var(--secondary-hover)
</style>
