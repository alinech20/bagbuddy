<script setup lang="ts">
import AppLogo from '@/components/shared/AppLogo.vue'
</script>

<template>
  <header class="auth-header">
    <div class="auth-header__wrapper">
      <AppLogo class="auth-header__logo" :width="100" />
      <h1 class="auth-header__title">BagBuddy</h1>
      <h2 class="auth-header__subtitle paragraph-1">Your travel packing companion</h2>
    </div>
  </header>
</template>

<style lang="sass">
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.auth-header
  &__wrapper
    margin-top: $spacer-xl
    text-align: center

  &__title
    font-size: $font-size-4xl
    font-weight: $font-weight-bold
    margin-top: $spacer-lg

  &__subtitle
    color: var(--text-primary-lighter)
    margin-top: $spacer-sm
</style>
