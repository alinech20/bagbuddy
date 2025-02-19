<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts'

const { logout } = useAuthStore()
</script>

<template>
  <div @click="logout">logout</div>
</template>

<style scoped lang="sass"></style>
