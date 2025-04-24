import { useApiRequest } from '@/composables/useApiRequest.ts'
import { API } from '@/constants.ts'

export const useItemService = () => {
  const getItemsByCategory = async (categoryId: number) => {
    try {
      const request = useApiRequest({
        url: API.ITEMS.BY_CATEGORY_ID,
        params: {
          cat_id: categoryId,
        },
      })

      if (!request) return
      const { data, error } = await request.get().json()

      // error is handled in useApiRequest
      if (error.value) return

      return data.value
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const getAllItems = async () => {
    try {
      const request = useApiRequest(API.ITEMS.ALL)

      if (!request) return
      const { data, error } = await request.get().json()

      // error is handled in useApiRequest
      if (error.value) return

      return data.value
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return {
    getItemsByCategory,
    getAllItems,
  }
}
