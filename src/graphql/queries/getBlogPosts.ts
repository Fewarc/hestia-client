import { gql } from "@apollo/client";

const GET_BLOG_POSTS = gql`
  query GetBlogPagePosts($userId: Float!) {
    getBlogPagePosts(userId: $userId) {
      userPosts {
        description
        id
        replyToId
        ownerId
        ownerUsername
        title
        upvotes
        tags
        postedAt
      }
      mostRecent {
        id
        replyToId
        ownerId
        ownerUsername
        title
        description
        upvotes
        tags
        postedAt
      }
      mostUpvoted {
        id
        replyToId
        ownerId
        ownerUsername
        title
        description
        upvotes
        tags
        postedAt
      }
    }
  }
`;

export default GET_BLOG_POSTS;