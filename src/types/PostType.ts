export type Post = {
  id: number,
  title: string,
  description: string,
  ownerId: number,
  replyToId: number | null,
  tags: string,
  upvotes: number,
  postedAt: Date,
  comments: Post[]
}