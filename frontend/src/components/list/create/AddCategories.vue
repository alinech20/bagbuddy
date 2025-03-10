<script setup lang="ts">
import { useCategoryStore } from '@/stores/category.ts'
import { storeToRefs } from 'pinia'
import { useCategoryService } from '@/services/category.ts'
import { onMounted } from 'vue'
import CreateListStep from '@/components/list/create/CreateListStep.vue'
import { useListStore } from '@/stores/list.ts'

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const { setCategories } = categoryStore
const { newList } = storeToRefs(useListStore())

onMounted(async () => {
  if (!categories.value.length)
    setCategories(await useCategoryService().getCategories())
})
</script>

<template>
  <CreateListStep title="Organize" subtitle="...and categorize">
    <v-chip-group v-model="newList.categories" multiple column>
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
