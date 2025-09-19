<script setup lang="ts">
import AuthHeader from '@/layouts/auth/AuthHeader.vue'
import AuthFooter from '@/layouts/auth/AuthFooter.vue'
</script>

<template>
  <div class="auth-layout">
    <AuthHeader class="auth-layout__header" />
    <main class="auth-layout__content">
      <router-view />
    </main>
    <AuthFooter clas="auth-layout__footer" />
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/vars/spacers'

.auth-layout
  display: grid
  grid-template-rows: auto 1fr auto
  min-height: 100vh
  padding: $spacer-sm $spacer-lg

  .auth-layout__content
    margin: $spacer-lg 0
    width: 100%
    max-width: 600px
</style>
