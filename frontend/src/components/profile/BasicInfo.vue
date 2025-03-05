<script setup lang="ts">
import type { IUser } from '@/types/user.ts'
import { computed } from 'vue'

const props = defineProps<{
  user: IUser
}>()

// const initials = computed(() => {
//   if (!props.user.first_name || !props.user.last_name) return ''
//   return props.user.first_name.slice(0, 1) + props.user.last_name.slice(0, 1)
// })

const fullName = computed(() => {
  if (!props.user.first_name || !props.user.last_name) return ''
  return `${props.user.first_name} ${props.user.last_name}`
})
</script>

<template>
  <v-sheet color="background" class="text-center">
    <v-avatar size="150" variant="tonal">
      <v-icon size="100">mdi-account</v-icon>
    </v-avatar>
    <h2 class="text-h4 mt-4 font-weight-medium">{{ fullName }}</h2>
    <v-chip prepend-icon="mdi-email" class="mt-2 px-6">
      {{ props.user.email }}
    </v-chip>
  </v-sheet>
</template>

<style lang="sass" scoped>
.profile__photo
  position: absolute
  top: 0
  left: 50%
  transform: translate(-50%, -50%)
</style>
