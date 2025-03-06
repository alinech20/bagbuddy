<script setup lang="ts">
import router from '@/router'

const navItems = [
  { title: 'List', icon: 'mdi-playlist-plus', to: 'Create Packing List' },
  { title: 'Profile', icon: 'mdi-account', to: 'My Profile' },
]

const navigateTo = (name: string) => {
  router.push({ name })
}
</script>

<template>
  <v-bottom-navigation bg-color="primary">
    <v-btn
      v-for="{ title, icon, to } in navItems"
      :key="to"
      @click="navigateTo(to)"
    >
      <v-icon>{{ icon }}</v-icon>
      <span>{{ title.toUpperCase() }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>
