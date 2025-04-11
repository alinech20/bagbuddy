<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list.ts'
import { onMounted } from 'vue'

const listStore = useListStore()
const { resetCurrentList } = listStore
const { currentList } = storeToRefs(listStore)

onMounted(() => resetCurrentList())
</script>

<template>
  <v-sheet class="text-center" max-width="600" color="background">
    <h2 class="text-h4">Let's get started!</h2>

    <v-form class="d-flex justify-center d-flex flex-column">
      <h3 class="text-h5">What is this list about?</h3>
      <section>
        <div>
          <v-text-field label="Name" required />
          <v-text-field class="mt-4" label="Description" />
        </div>
        <v-btn class="mt-4 float-right" color="primary">Save</v-btn>
      </section>
    </v-form>
  </v-sheet>
</template>
