import type { IUser } from '@/types/user.ts'
import type { IListCategory } from '@/types/categories.ts'
import type { IListItem } from '@/types/items.ts'

export interface IList {
  id: number
  owner: IUser
  name: string
  description?: string
  status: string
  is_template: boolean
  template_id?: number
  created_at: string
  updated_at: string
  categories: IListCategory[]
  items: IListItem[]
}
