export type Note = {
  id: number;
  ownerId: number,
  eventId: number,
  content: string,
  createdAt: Date,
  updatedAt: Date
}