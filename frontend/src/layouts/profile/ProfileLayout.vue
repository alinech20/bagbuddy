<script setup lang="ts">
import ProfileHeader from '@/layouts/profile/ProfileHeader.vue'
</script>

<template>
  <ProfileHeader />
  <v-main class="px-4 pb-8 mt-8">
    <router-view />
  </v-main>
</template>
