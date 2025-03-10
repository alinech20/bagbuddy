<script setup lang="ts">
import CreateListStep from '@/components/list/create/CreateListStep.vue'
import { useListStore } from '@/stores/list.ts'
import { storeToRefs } from 'pinia'

const listStore = useListStore()
const { newList } = storeToRefs(listStore)
</script>

<template>
  <CreateListStep
    title="Let's get started!"
    subtitle="What is this list about?"
  >
    <v-text-field v-model="newList.name" label="Name" required />
    <v-textarea
      v-model="newList.description"
      class="mt-4"
      label="Description"
    />
  </CreateListStep>
</template>
