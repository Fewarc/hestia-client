export enum typeOfNotification {
  NOTIFICATION = 'notification',
  MESSAGE = 'message',
  EVENT = 'event'
}

export interface NotificationType {
  type: typeOfNotification,
  content: string,
  link?: string,
  id?: number,
  userId?: number
}