import { gql } from "@apollo/client";

const GET_NOTE = gql`
  query GetNote($eventId: Float!, $userId: Float!) {
    getNote(eventId: $eventId, userId: $userId) {
      id
      eventId
      ownerId
      content
      createdAt
      updatedAt
    }
  }
`;

export default GET_NOTE;