import { defineStore } from 'pinia'
import { PINIA_STORE_KEYS } from '@/constants.ts'
import { ref } from 'vue'

export const useHttpRequestsStore = defineStore(
  PINIA_STORE_KEYS.HTTP_REQUESTS,
  () => {
    const ongoingRequestsNumber = ref(0)
    const addRequest = () => {
      ongoingRequestsNumber.value++
    }
    const removeRequest = () => {
      ongoingRequestsNumber.value--
    }

    return { ongoingRequestsNumber, addRequest, removeRequest }
  },
)
