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
  <v-card width="360" variant="flat" class="mx-auto" color="secondary" border>
    <template #title>{{ fullName }}</template>
    <!--    <v-card-title>-->
    <!--      <v-avatar-->
    <!--        class="profile__photo"-->
    <!--        color="primary"-->
    <!--        size="100"-->
    <!--        variant="elevated"-->
    <!--      >-->
    <!--        <span class="text-h4">{{ initials }}</span>-->
    <!--      </v-avatar>-->
    <!--      <section class="text-center">-->
    <!--        {{ fullName }}-->
    <!--      </section>-->
    <!--    </v-card-title>-->
    <v-card-text class="bg-background">
      <v-list class="bg-background">
        <v-list-item>
          <v-list-item-title>Email</v-list-item-title>
          <v-list-item-subtitle>{{ props.user.email }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Birthdate</v-list-item-title>
          <v-list-item-subtitle>
            {{ props.user.birth_date }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Gender</v-list-item-title>
          <v-list-item-subtitle>{{ props.user.gender }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<style lang="sass" scoped>
.profile__photo
  position: absolute
  top: 0
  left: 50%
  transform: translate(-50%, -50%)
</style>
