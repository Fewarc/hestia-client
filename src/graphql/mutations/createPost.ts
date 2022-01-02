import { gql } from "@apollo/client";

const CREATE_POST = gql`
  mutation Mutation($tags: String!, $userId: Float!, $content: String!, $title: String!, $relatedOffer: Int, $replyToId: Int, $postId: Int) {
    createPost(tags: $tags, userId: $userId, content: $content, title: $title, relatedOffer: $relatedOffer, replyToId: $replyToId, postId: $postId)
  }
`;

export default CREATE_POST;