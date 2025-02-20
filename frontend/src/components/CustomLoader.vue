<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHttpRequestsStore } from '@/stores/http-requests.ts'
import { computed } from 'vue'

const { ongoingRequestsNumber } = storeToRefs(useHttpRequestsStore())
const loading = computed(() => ongoingRequestsNumber.value !== 0)
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
