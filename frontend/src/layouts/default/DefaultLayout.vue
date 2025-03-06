<script setup lang="ts">
import DefaultFooter from '@/layouts/default/DefaultFooter.vue'
</script>

<template>
  <!--  <DefaultHeader />-->
  <v-main class="px-4 pb-8 mt-8 mb-14">
    <router-view />
  </v-main>
  <DefaultFooter />
</template>
