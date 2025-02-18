<script setup lang="ts">
import CustomLoader from '@/components/CustomLoader.vue'

// TODO: change in db data types to text instead of varchar
</script>

<template>
  <v-app class="bagbuddy">
    <router-view />
    <CustomLoader />
  </v-app>
</template>
