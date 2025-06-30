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
.auth-layout
  display: flex
  flex-direction: column
  align-items: center
  min-height: 100vh

  .auth-layout__content
    flex: 1
    width: 80%
    max-width: 600px
</style>
