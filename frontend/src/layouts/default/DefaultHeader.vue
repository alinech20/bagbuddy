<script setup lang="ts">
import { ref } from 'vue'
import MainMenu from '@/components/MainMenu.vue'

const showMenu = ref(false)
const toggleMenu = () => (showMenu.value = !showMenu.value)
</script>

<template>
  <v-app-bar scroll-behavior="hide" elevation="2" color="primary">
    <v-app-bar-nav-icon @click.stop="toggleMenu" />
    <v-toolbar-title>My Profile</v-toolbar-title>
    <v-spacer />
  </v-app-bar>
  <MainMenu :show="showMenu" @close-dialog="showMenu = false" />
</template>
