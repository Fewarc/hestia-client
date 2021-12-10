import { gql } from "@apollo/client";

const GET_ALL_NOTES = gql`
  query Query($userId: Float!) {
    getAllNotes(userId: $userId) {
      id
      eventId
      ownerId
      content
      createdAt
      updatedAt
    }
  }
`;

export default GET_ALL_NOTES;