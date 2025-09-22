<script setup lang="ts">
import DefaultHeader from '@/layouts/default/DefaultHeader.vue'
import DefaultFooter from '@/layouts/default/DefaultFooter.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const background = computed(() => {
  return useRoute().meta.background || 'var(--background)'
})
</script>

<template>
  <DefaultHeader />
  <div class="default-layout" :style="''">
    <main class="default-layout__content">
      <router-view />
    </main>
  </div>
  <DefaultFooter />
</template>

<style lang="sass">
@import '@/assets/sass/vars/sizes'
@import '@/assets/sass/vars/spacers'

.default-layout
  overflow: auto
  background-color: v-bind(background)
  min-height: calc(100dvh - $footer-height)
  padding-bottom: $footer-height

  .default-layout__content
    padding: $spacer-lg
</style>
