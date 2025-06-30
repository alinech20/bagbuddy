<script setup lang="ts">
import AppLogo from '@/components/shared/AppLogo.vue'
</script>

<template>
  <header class="auth-header">
    <div class="auth-header__wrapper">
      <AppLogo class="auth-header__logo" :width="180" />
      <h1 class="auth-header__title">BagBuddy</h1>
    </div>
  </header>
</template>

<style lang="sass">
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.auth-header
  &__wrapper
    margin-top: $spacer-3xl

  &__title
    font-size: $font-size-4xl
    font-weight: $font-weight-medium
    margin-top: $spacer-xl
</style>
