<script setup lang="ts">
import DefaultFooter from '@/layouts/default/DefaultFooter.vue'
import router from '@/router'
import { computed } from 'vue'

const addSpacing = computed(() => router.currentRoute.value.path !== '/lists/create')
</script>

<template>
  <div class="default-layout">
    <main
      class="default-layout__content"
      :class="{
        'content-spacing': addSpacing,
      }"
    >
      <router-view />
    </main>
  </div>
  <DefaultFooter />
</template>

<style lang="sass">
@import '@/assets/sass/vars/spacers'

.default-layout
  overflow: auto

  .default-layout__content
    &.content-spacing
      padding: $spacer-md
</style>
