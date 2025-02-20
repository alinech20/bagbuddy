<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.ts'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BasicInfo from '@/components/profile/BasicInfo.vue'
import UserPreferences from '@/components/profile/UserPreferences.vue'

const { user } = storeToRefs(useUserStore())
const isOwn = computed(() => !useRoute().params.id)
</script>

<template>
  <BasicInfo :user="user" />
  <UserPreferences class="mt-4" :user="user" />
</template>
