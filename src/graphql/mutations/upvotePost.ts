import { gql } from "@apollo/client";

const UPVOTE_POST = gql`
  mutation UpvotePost($userId: Float!, $postId: Float!) {
    upvotePost(userId: $userId, postId: $postId)
  }
`;

export default UPVOTE_POST;