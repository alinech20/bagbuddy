export interface ICategory {
  id: number
  name: string
  description?: string
  icon?: string
  active: boolean
  created_at: string
  updated_at: string
  parent_id?: number
  subcategories?: ICategory[]
}
