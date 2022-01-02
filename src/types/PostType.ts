export type Post = {
  id: number,
  title: string,
  description: string,
  ownerId: number,
  ownerUsername: number | null,
  replyToId: number | null,
  tags: string,
  upvotes: number,
  postedAt: Date,
  comments: Post[],
  relatedOffer: number | null
}