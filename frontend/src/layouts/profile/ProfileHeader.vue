<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts'

const { logout } = useAuthStore()
</script>

<template>
  <v-app-bar scroll-behavior="hide">
    <!--    TODO: implement menu-->
    <!--    <v-app-bar-nav-icon />-->
    <v-toolbar-title>My Profile</v-toolbar-title>
    <v-spacer />
    <v-btn icon @click="logout" title="Logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>
