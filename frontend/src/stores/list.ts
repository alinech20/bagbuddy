import { defineStore } from 'pinia'
import { PINIA_STORE_KEYS } from '@/constants.ts'
import type { IList } from '@/types/list.ts'
import { ref } from 'vue'
import type { TNullableOptional } from '@/types/helpers.ts'

export const useListStore = defineStore(PINIA_STORE_KEYS.LIST, () => {
  const currentList = ref<TNullableOptional<IList>>()
  const resetCurrentList = () => {
    currentList.value = {} as IList
  }

  const newList = ref<IList>({} as IList)
  const saveNewList = () => {
    console.log(newList.value)
  }

  return {
    currentList,
    resetCurrentList,

    newList,
    saveNewList,
  }
})
