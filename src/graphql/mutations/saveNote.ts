import { gql } from "@apollo/client";

const SAVE_NOTE = gql`
  mutation Mutation($content: String!, $eventId: Float!, $userId: Float!) {
    saveNote(content: $content, eventId: $eventId, userId: $userId)
  }
`;

export default SAVE_NOTE;