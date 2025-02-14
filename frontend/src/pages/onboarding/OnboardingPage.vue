<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const step = ref<number>(Number.parseInt(route.params.step as string, 10) || 1)
</script>

<template>
  {{ step }}
</template>
