<script setup lang="ts"></script>

<template>
  <section class="default-header">
    <h1 class="header__title header-6">{{ $route.name }}</h1>
  </section>
</template>

<style lang="sass">
@import '@/assets/sass/vars/sizes'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.default-header
  display: flex
  align-items: center
  justify-content: center
  height: $header-height
  background-color: white
  border-bottom: 1px solid var(--border-light-gray)
  padding: $spacer-md

  .header__title
    font-weight: $font-weight-bold
</style>
