import { defineStore, storeToRefs } from 'pinia'
import { PINIA_STORE_KEYS } from '@/constants.ts'
import type { IList } from '@/types/list.ts'
import { ref } from 'vue'
import type { TNullableOptional } from '@/types/helpers.ts'
import { useLogger } from '@/composables/useLogger.ts'
import { useUserStore } from '@/stores/user.ts'
import { useListService } from '@/services/list.ts'
import { useErrorHandler } from '@/utils/useErrorHandler.ts'

export const useListStore = defineStore(PINIA_STORE_KEYS.LIST, () => {
  const { trace, info, debug } = useLogger()
  const { handleError } = useErrorHandler()
  const { createList } = useListService()
  const { user } = storeToRefs(useUserStore())

  // current user lists
  const lists = ref<IList[]>([])
  const setLists = (newLists: IList[]) => {
    lists.value.length = 0
    lists.value.push(...newLists)
    debug(`Number of lists: ${lists.value.length}`)
  }

  const currentList = ref<TNullableOptional<IList>>()
  const resetCurrentList = () => {
    currentList.value = {} as IList
  }

  const newList = ref<IList>({
    owner: user.value,
  } as IList)

  const saveNewList = async () => {
    trace('Saving new list')

    if (!Object.keys(newList.value).length)
      return handleError('No list data to save')

    if (!newList.value.name) return handleError('List name is required')
    if (!newList.value.items?.length)
      return handleError('List items are required')

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
    if (response && response.id) lists.value.push(response)

    debug(`Response: ${JSON.stringify(response, null, 2)}`)
    info('List saved')
  }

  return {
    lists,
    setLists,

    currentList,
    resetCurrentList,

    newList,
    saveNewList,
  }
})
