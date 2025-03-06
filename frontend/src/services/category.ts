import { useApiRequest } from '@/composables/useApiRequest.ts'
import { API } from '@/constants.ts'

export const useCategoryService = () => {
  const getCategories = async () => {
    const request = useApiRequest(API.CATEGORIES.ALL)
    if (!request) return
    const { data, error } = await request.get().json()

    if (error.value) {
      throw new Error(error.value)
    }

    return data.value
  }

  return {
    getCategories,
  }
}
