<script setup lang="ts">
import DefaultFooter from '@/layouts/default/DefaultFooter.vue'
</script>

<template>
  <div class="default-layout">
    <main class="default-layout__content">
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
    padding: $spacer-lg
</style>
