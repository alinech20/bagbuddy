<script setup lang="ts">
import { useCategoryStore } from '@/stores/category.ts'
import { storeToRefs } from 'pinia'
import { useCategoryService } from '@/services/category.ts'
import { onMounted, ref } from 'vue'

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const { setCategories } = categoryStore

const selectedCategories = ref<number[]>([])

onMounted(async () => {
  if (!categories.value.length)
    setCategories(await useCategoryService().getCategories())
})
</script>

<template>
  <v-sheet class="text-center" max-width="600" color="background">
    <h2 class="text-h4">Categorize!</h2>

    <v-form class="d-flex d-flex flex-column justify-space-between mt-4">
      <h3 class="text-h5">Which categories of items will you pack?</h3>
      <section class="mt-8">
        <v-chip-group v-model="selectedCategories" multiple column>
          <v-chip color="secondary" v-for="cat in categories" :key="cat.id">
            <span>{{ cat.icon }}</span>
            <span class="ml-2">{{ cat.name }}</span>
          </v-chip>
        </v-chip-group>
      </section>
    </v-form>
  </v-sheet>
</template>
