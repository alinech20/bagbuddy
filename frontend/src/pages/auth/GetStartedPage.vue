<script setup lang="ts">
import SharedButton from '@/components/shared/forms/SharedButton.vue'
import router from '@/router'
</script>

<template>
  <div class="get-started">
    <h2 class="get-started__title"><em>Plan your trip. Pack with joy.</em></h2>
    <h3 class="get-started__subtitle"><em>BagBuddy helps you stay calm, organized, and travel-ready.</em></h3>
    <SharedButton class="btn-primary btn-start" @click="router.push({ name: 'Register' })">Get started!</SharedButton>
    <p class="login">Already have an account? <router-link :to="{ name: 'Login' }">Log in!</router-link></p>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/vars/sizes'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.get-started
  text-align: center
  margin-top: $spacer-lg

  .get-started__title em
    font-size: $font-size-2xl
    color: var(--text-primary-light)

  .get-started__subtitle
    margin-top: $spacer-md
    font-size: $font-size-lg

    em
      color: var(--text-primary-lighter)

  .btn-start
    width: 100%
    max-width: 300px
    margin: $spacer-xl auto 0
    font-size: $font-size-xl

  p.login
    font-size: $font-size-md
    margin-top: $spacer-xl
    color: var(--text-primary-light)

    a
      font-size: $font-size-lg
      font-weight: $font-weight-medium
</style>
