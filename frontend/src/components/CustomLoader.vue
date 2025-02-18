<script setup lang="ts">
import { ref } from 'vue'

// TODO: move this to a store and implement logic to show/hide the loader
const loading = ref(false)

// Simulate a request
// setTimeout(() => {
//   loading.value = false
// }, 3000)
</script>

<template>
  <article
    v-if="loading"
    class="custom-loader d-flex justify-center align-center bg-background"
  >
    <v-progress-circular indeterminate color="surface" width="8" size="128" />
  </article>
</template>

<style lang="sass">
.custom-loader
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 999
</style>
