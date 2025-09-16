<script setup lang="ts">
import CreateListStep from '@/components/list/create/CreateListStep.vue'
import { useListStore } from '@/stores/list.ts'
import { storeToRefs } from 'pinia'
import SharedInput from '@/components/shared/forms/SharedInput.vue'

const listStore = useListStore()
const { newList } = storeToRefs(listStore)
</script>

<template>
  <CreateListStep title="Let's get started!" subtitle="What is this list about?">
    <SharedInput label="Name" v-model="newList.name" />
    <SharedInput label="Description" v-model="newList.description" textarea />
  </CreateListStep>
</template>
