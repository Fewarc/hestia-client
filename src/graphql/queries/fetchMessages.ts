import { gql } from "@apollo/client";

const FETCH_MESSAGES = gql`
  query GetMessages($secondUser: Float!, $firstUser: Float!) {
    getMessages(secondUser: $secondUser, firstUser: $firstUser) {
      id
      toId
      fromId
      content
      sentAt
    }
  }
`;

export default FETCH_MESSAGES;