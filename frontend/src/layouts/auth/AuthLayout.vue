<script setup lang="ts">
import AuthHeader from '@/layouts/auth/AuthHeader.vue'
import AuthFooter from '@/layouts/auth/AuthFooter.vue'
</script>

<template>
  <v-layout class="h-100 d-flex flex-column align-center justify-space-between">
    <AuthHeader class="auth-layout__header d-flex align-center" />
    <v-main class="auth-layout__content">
      <router-view />
    </v-main>
    <AuthFooter clas="auth-layout__footer" />
  </v-layout>
</template>

<style lang="sass">
.auth-layout__header,
.auth-layout__footer
  flex-grow: 1

.auth-layout__content
  flex-grow: 2
</style>
