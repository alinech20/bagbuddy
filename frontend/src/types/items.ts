export interface IItem {
  id: number
  name: string
  category_id: number
  created_at: string
  updated_at: string
}

export interface IListItem extends IItem {
  priority_id: number
  quantity: number
  quantity_prepared: number
  quantity_to_buy: number
  packed: boolean
  bought: boolean
  notes: string
}
