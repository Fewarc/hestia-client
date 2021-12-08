export type Message = {
  id: number,
  toId: number,
  fromId: number,
  content: string,
  sentAt: Date
}