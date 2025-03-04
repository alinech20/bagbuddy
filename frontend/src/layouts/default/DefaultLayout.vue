<script setup lang="ts">
import DefaultHeader from '@/layouts/default/DefaultHeader.vue'
</script>

<template>
  <DefaultHeader />
  <v-main class="px-4 pb-8 mt-8">
    <router-view />
  </v-main>
</template>
