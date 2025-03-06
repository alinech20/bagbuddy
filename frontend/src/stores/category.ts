import { defineStore } from 'pinia'
import { PINIA_STORE_KEYS } from '@/constants.ts'
import type { ICategory } from '@/types/categories.ts'
import { ref } from 'vue'

export const useCategoryStore = defineStore(PINIA_STORE_KEYS.CATEGORY, () => {
  const categories = ref<ICategory[]>([])
  const setCategories = (newCategories: ICategory[]) => {
    categories.value.length = 0
    categories.value.push(...newCategories)
  }

  return {
    categories,
    setCategories,
  }
})
