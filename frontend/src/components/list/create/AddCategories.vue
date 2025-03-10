<script setup lang="ts">
import { useCategoryStore } from '@/stores/category.ts'
import { storeToRefs } from 'pinia'
import { useCategoryService } from '@/services/category.ts'
import { onMounted, ref } from 'vue'
import CreateListStep from '@/components/list/create/CreateListStep.vue'
import type { ICategory } from '@/types/categories.ts'

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const { setCategories } = categoryStore

const selectedCategories = ref<ICategory[]>([])

onMounted(async () => {
  if (!categories.value.length)
    setCategories(await useCategoryService().getCategories())
})
</script>

<template>
  <CreateListStep
    title="Organize!"
    subtitle="Which types of items will you pack?"
  >
    <v-chip-group v-model="selectedCategories" multiple column>
      <v-chip
        color="secondary"
        v-for="cat in categories"
        :key="cat.id"
        :value="cat"
      >
        <span>{{ cat.icon }}</span>
        <span class="ml-2">{{ cat.name }}</span>
      </v-chip>
    </v-chip-group>
  </CreateListStep>
</template>
