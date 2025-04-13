import { PINIA_STORE_KEYS } from '@/constants.ts'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IItem } from '@/types/items.ts'

export const useItemStore = defineStore(PINIA_STORE_KEYS.ITEM, () => {
  const items = ref<IItem[]>([])
  const setItems = (newItems: IItem[]) => {
    items.value.length = 0
    items.value.push(...newItems)
  }

  return {
    items,
    setItems,
  }
})
