<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHttpRequestsStore } from '@/stores/http-requests.ts'
import { computed } from 'vue'

const { ongoingRequestsNumber } = storeToRefs(useHttpRequestsStore())
const loading = computed(() => ongoingRequestsNumber.value !== 0)
</script>

<template>
  <article v-if="loading" class="custom-loader d-flex justify-center align-center bg-background">
    <div class="spinner"></div>
  </article>
</template>

<style lang="sass">
@import '@/assets/sass/vars/borders'

.custom-loader
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 999
  display: flex
  justify-content: center
  align-items: center

.spinner
  width: 128px
  height: 128px
  border: $border-radius-md solid var(--dirty-background)
  border-top: $border-radius-md solid var(--primary)
  border-radius: $border-radius-circle
  animation: spin 1s linear infinite

@keyframes spin
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>
