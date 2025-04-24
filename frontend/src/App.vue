<script setup lang="ts">
import CustomLoader from '@/components/CustomLoader.vue'
import SnackBar from '@/components/SnackBar.vue'
</script>

<template>
  <v-app>
    <router-view />
    <CustomLoader />
    <SnackBar />
  </v-app>
</template>
