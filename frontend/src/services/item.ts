import { useApiRequest } from '@/composables/useApiRequest.ts'
import { API } from '@/constants.ts'

export const useItemService = () => {
  const getItemsByCategory = async (categoryId: number) => {
    const request = useApiRequest({
      url: API.ITEMS.BY_CATEGORY_ID,
      params: {
        cat_id: categoryId,
      },
    })

    if (!request) return
    const { data, error } = await request.get().json()

    if (error.value) {
      throw new Error(error.value)
    }

    return data.value
  }

  const getAllItems = async () => {
    const request = useApiRequest(API.ITEMS.ALL)

    if (!request) return
    const { data, error } = await request.get().json()

    if (error.value) {
      throw new Error(error.value)
    }

    return data.value
  }

  return {
    getItemsByCategory,
    getAllItems,
  }
}
