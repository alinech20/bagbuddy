<script setup lang="ts">
import CreateListStep from '@/components/list/create/CreateListStep.vue'
</script>

<template>
  <CreateListStep
    title="Let's get started!"
    subtitle="What is this list about?"
  >
    <v-text-field label="Name" required />
    <v-textarea class="mt-4" label="Description" />
  </CreateListStep>
</template>
