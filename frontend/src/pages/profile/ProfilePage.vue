<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.ts'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProfileHead from '@/components/profile/ProfileHead.vue'
import ProfileStats from '@/components/profile/ProfileStats.vue'
import ProfilePreferences from '@/components/profile/ProfilePreferences.vue'

const { user } = storeToRefs(useUserStore())
const isOwn = computed(() => !useRoute().params.id)
</script>

<template>
  <section class="profile-page">
    <ProfileHead :user="user" :own="isOwn" />
    <ProfileStats />
    <ProfilePreferences :user="user" />
  </section>
</template>

<style lang="sass">
.profile-page
</style>
