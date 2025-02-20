<script setup lang="ts">
import OnboardingHeader from '@/layouts/onboarding/OnboardingHeader.vue'
</script>

<template>
  <v-layout>
    <OnboardingHeader />
    <v-main class="onboarding-layout__content">
      <router-view />
    </v-main>
  </v-layout>
</template>

<style lang="sass">
main
  max-width: 600px

  .v-text-field
    margin-top: 16px

    &:first-of-type
      margin-top: 0
</style>
