<script setup lang="ts">
defineProps<{
  width?: number
  height?: number
}>()
</script>

<template>
  <div class="app-logo">
    <img
      src="@/assets/logos/bagbuddy-logo-circle.png"
      alt="BagBuddy logo"
      class="app-logo__auth mx-auto"
      :width="width || 100"
      :height="height || width || 100"
    />
  </div>
</template>

<style lang="sass">
.app-logo
  display: flex
  justify-content: center
  align-items: center
</style>
