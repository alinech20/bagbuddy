import { defineStore } from 'pinia'
import { PINIA_STORE_KEYS } from '@/constants.ts'
import type { IListCategory } from '@/types/categories.ts'
import { ref } from 'vue'

export const useCategoryStore = defineStore(PINIA_STORE_KEYS.CATEGORY, () => {
  const categories = ref<IListCategory[]>([])
  const setCategories = (newCategories: IListCategory[]) => {
    categories.value.length = 0
    categories.value.push(...newCategories)
  }

  return {
    categories,
    setCategories,
  }
})
