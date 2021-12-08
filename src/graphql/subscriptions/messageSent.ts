import { gql } from "@apollo/client";

const MESSAGE_SENT = gql`
  subscription MessageSent($secondUser: Float!, $firstUser: Float!) {
    messageSent(secondUser: $secondUser, firstUser: $firstUser) {
      id
      toId
      fromId
      content
      sentAt
    }
  }
`;

export default MESSAGE_SENT;