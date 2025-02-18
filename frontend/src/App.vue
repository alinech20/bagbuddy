<script setup lang="ts">
import CustomLoader from '@/components/CustomLoader.vue'
</script>

<template>
  <v-app class="bagbuddy">
    <router-view />
    <CustomLoader />
  </v-app>
</template>
