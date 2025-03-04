<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts'
import router from '@/router'

defineProps<{
  show: boolean
}>()

defineEmits(['close-dialog'])

const { logout } = useAuthStore()

const navigateTo = (name: string) => {
  router.push({ name })
}

const menuItems = [
  {
    title: 'Create Packing List',
    icon: 'mdi-playlist-plus',
    action: () => navigateTo('Create Packing List'),
  },
  {
    title: 'My Profile',
    icon: 'mdi-account',
    action: () => navigateTo('My Profile'),
  },
  { title: 'Logout', icon: 'mdi-logout', action: logout },
]
</script>

<template>
  <v-navigation-drawer
    :model-value="show"
    @update:model-value="$emit('close-dialog')"
    location="top"
    temporary
    color="background"
  >
    <v-list>
      <v-list-item
        v-for="{ title, icon, action } in menuItems"
        :key="title"
        :prepend-icon="icon"
        :title="title"
        :value="title"
        @click="action && action()"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped lang="sass"></style>
