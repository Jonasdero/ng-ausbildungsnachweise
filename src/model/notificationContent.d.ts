interface NotificationContent {
  id: number,
  text: string,
  duration: number,
  currentDuration?: number,
  type: number // 0 info 1 warning 2 error
}