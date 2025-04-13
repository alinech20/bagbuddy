import { defineStore, storeToRefs } from 'pinia'
import { PINIA_STORE_KEYS } from '@/constants.ts'
import type { IList } from '@/types/list.ts'
import { ref } from 'vue'
import type { TNullableOptional } from '@/types/helpers.ts'
import { useLogger } from '@/composables/useLogger.ts'
import { useUserStore } from '@/stores/user.ts'
import { useListService } from '@/services/list.ts'

export const useListStore = defineStore(PINIA_STORE_KEYS.LIST, () => {
  const { info, debug, error } = useLogger()
  const { createList } = useListService()
  const { user } = storeToRefs(useUserStore())

  const currentList = ref<TNullableOptional<IList>>()
  const resetCurrentList = () => {
    currentList.value = {} as IList
  }

  const newList = ref<IList>({
    owner: user.value,
  } as IList)

  const saveNewList = async () => {
    info('Saving new list')

    if (!Object.keys(newList.value).length) return error('No list data to save')

    if (!newList.value.name) return error('List name is required')
    if (!newList.value.items?.length) return error('List items are required')

    debug(`New list value: ${JSON.stringify(newList.value, null, 2)}`)

    const { categories, owner, items, ...rest } = newList.value

    const payload = {
      ...rest,
      items: items.map((item) => ({
        item_id: item.id,
      })),
      profile_id: user.value.id,
    }

    debug(`Payload: ${JSON.stringify(payload, null, 2)}`)

    const response = await createList(payload)
    debug(`Response: ${JSON.stringify(response, null, 2)}`)
  }

  return {
    currentList,
    resetCurrentList,

    newList,
    saveNewList,
  }
})
