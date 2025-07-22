<script setup lang="ts">
import DefaultFooter from '@/layouts/default/DefaultFooter.vue'
import router from '@/router'
import { computed } from 'vue'

const addPaddingAndMargin = computed(() => router.currentRoute.value.path !== '/lists/create')
</script>

<template>
  <div class="default-layout">
    <main
      class="default-layout__content"
      :class="{
        'px-4': addPaddingAndMargin,
        'pb-8': addPaddingAndMargin,
        'mt-8': addPaddingAndMargin,
      }"
    >
      <router-view />
    </main>
  </div>
  <DefaultFooter />
</template>

<style lang="sass">
.default-layout
  overflow: auto
</style>
