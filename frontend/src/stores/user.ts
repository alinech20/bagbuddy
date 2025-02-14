import { defineStore } from 'pinia'
import { ref } from 'vue'
import { PINIA_STORE_KEYS } from '@/constants.ts'
import type { IUser } from '@/types/user.ts'

export const useUserStore = defineStore(PINIA_STORE_KEYS.USER, () => {
  const user = ref<IUser>({} as IUser)

  const setUser = (u: IUser) => {
    user.value = u
  }

  const clearUser = () => {
    user.value = {} as IUser
  }

  return { user, setUser, clearUser }
})
