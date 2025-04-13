import type { TNullable } from '@/types/helpers.ts'

export interface IListCategory {
  id: number
  name: string
  description?: string
  icon: string
  active: boolean
  parent_id: TNullable<number>
  subcategories: IListCategory[]
  created_at: string
  updated_at: string
}
