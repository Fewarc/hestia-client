import { gql } from "@apollo/client";

const DOWNVOTE_POST = gql`
  mutation DownvotePost($userId: Float!, $postId: Float!) {
    downvotePost(userId: $userId, postId: $postId)
  }
`;

export default DOWNVOTE_POST;