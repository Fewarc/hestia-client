import { gql } from "@apollo/client";

const FIND_POSTS = gql`
  query FindPost($searchValue: String!) {
    findPost(searchValue: $searchValue) {
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
`;

export default FIND_POSTS;