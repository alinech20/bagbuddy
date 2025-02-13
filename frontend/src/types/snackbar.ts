export interface ISnackBarMessage {
  msg: string
  style: 'error' | 'info' | 'success'
  duration?: number
}
