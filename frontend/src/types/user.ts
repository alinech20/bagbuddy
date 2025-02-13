import type { TNullable } from '@/types/helpers'
import type { User } from 'firebase/auth'

export interface IUser {
  uid: string
  firebase_data: User
  email: string
  status_id: number
  first_name: TNullable<string>
  last_name: TNullable<string>
  birth_date: TNullable<string>
  id: number
  onboarded: boolean
  created_at: string
  updated_at: string
}
