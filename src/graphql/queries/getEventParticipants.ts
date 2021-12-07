import { gql } from "@apollo/client";

const GET_PARTICIPANTS = gql`
  query GetEventParticipants($eventId: Float!) {
    getEventParticipants(eventId: $eventId) {
      id
      login
      role
      firstName
      lastName
    }
  }
`;

export default GET_PARTICIPANTS;