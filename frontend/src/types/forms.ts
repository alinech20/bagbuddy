export interface ISelectOption {
  label: string
  value: string | number | boolean
}

export type TSelectOption = ISelectOption | string

export interface IRadioOption {
  label: string
  value: string
}
