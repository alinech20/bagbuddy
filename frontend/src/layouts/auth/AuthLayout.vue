<script setup lang="ts">
import AuthHeader from '@/layouts/auth/AuthHeader.vue'
import AuthFooter from '@/layouts/auth/AuthFooter.vue'
</script>

<template>
  <v-layout class="h-100 d-flex flex-column align-center justify-space-between">
    <article class="h-75 d-flex flex-column align-center justify-space-evenly">
      <AuthHeader class="auth-header" />
      <main>
        <router-view />
      </main>
    </article>
    <AuthFooter clas="auth-layout__footer" />
  </v-layout>
</template>
