import { gql } from "@apollo/client";

const SEND_MESSAGE = gql`
  mutation SendMessage($content: String!, $toId: Float!, $fromId: Float!) {
    sendMessage(content: $content, toId: $toId, fromId: $fromId)
  }
`;

export default SEND_MESSAGE;