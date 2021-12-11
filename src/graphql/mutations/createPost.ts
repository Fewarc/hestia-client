import { gql } from "@apollo/client";

const CREATE_POST = gql`
  mutation CreatePost($tags: String!, $userId: Float!, $content: String!, $title: String!) {
    createPost(tags: $tags, userId: $userId, content: $content, title: $title)
  }
`;

export default CREATE_POST;