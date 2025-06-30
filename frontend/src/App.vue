<script setup lang="ts">
import CustomLoader from '@/components/CustomLoader.vue'
import SnackBar from '@/components/SnackBar.vue'
</script>

<template>
  <router-view />
  <CustomLoader />
  <SnackBar />
</template>
