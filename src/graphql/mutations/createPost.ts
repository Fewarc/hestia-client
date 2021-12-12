import { gql } from "@apollo/client";

const CREATE_POST = gql`
  mutation CreatePost($tags: String!, $userId: Float!, $content: String!, $title: String!, $postId: Int, $replyToId: Int) {
    createPost(tags: $tags, userId: $userId, content: $content, title: $title, postId: $postId, replyToId: $replyToId)
  }
`;

export default CREATE_POST;