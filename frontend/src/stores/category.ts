import { defineStore } from 'pinia'
import { PINIA_STORE_KEYS } from '@/constants.ts'
import type { IListCategory } from '@/types/categories.ts'
import { computed, ref } from 'vue'

export const useCategoryStore = defineStore(PINIA_STORE_KEYS.CATEGORY, () => {
  const categories = ref<IListCategory[]>([])
  const setCategories = (newCategories: IListCategory[]) => {
    categories.value.length = 0
    categories.value.push(...newCategories)
  }

  const subcategories = computed(() => {
    return categories.value.flatMap((category) => category.subcategories || [])
  })

  const topLevelCategories = computed(() => {
    return categories.value.filter((category) => !category.parent_id)
  })

  return {
    categories,
    setCategories,
    subcategories,
    topLevelCategories,
  }
})
