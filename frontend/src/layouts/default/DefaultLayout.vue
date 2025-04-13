<script setup lang="ts">
import DefaultFooter from '@/layouts/default/DefaultFooter.vue'
import router from '@/router'
import { computed } from 'vue'

const addPaddingAndMargin = computed(
  () => router.currentRoute.value.path !== '/lists/create',
)
</script>

<template>
  <v-layout class="overflow-auto">
    <!--  <DefaultHeader />-->
    <v-main
      class="mb-14"
      :class="{
        'px-4': addPaddingAndMargin,
        'pb-8': addPaddingAndMargin,
        'mt-8': addPaddingAndMargin,
      }"
    >
      <router-view />
    </v-main>
  </v-layout>
  <DefaultFooter />
</template>
