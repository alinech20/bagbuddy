<script setup lang="ts">
import DefaultHeader from '@/layouts/default/DefaultHeader.vue'
import DefaultFooter from '@/layouts/default/DefaultFooter.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const background = computed(() => {
  return route?.meta?.background || 'var(--background)'
})
</script>

<template>
  <div class="default-layout" :style="''">
    <DefaultHeader />
    <main class="default-layout__content">
      <router-view />
    </main>
    <DefaultFooter />
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/vars/sizes'
@import '@/assets/sass/vars/spacers'

.default-layout
  overflow: auto
  background-color: v-bind(background)
  min-height: calc(100dvh - $footer-height)
  height: 100%
  padding-bottom: $footer-height

  .default-layout__content
    padding: $spacer-lg
    height: calc(100dvh - $footer-height - $header-height)
    overflow: auto
</style>
