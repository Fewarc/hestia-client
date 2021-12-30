import { gql } from "@apollo/client";

const GET_CLIENTS_EVENTS = gql`
  query GetClientEvents($clientId: Float!, $agentId: Float!) {
    getClientEvents(clientId: $clientId, agentId: $agentId) {
      pastEvents {
        id
        ownerId
        eventName
        eventDescription
        eventOccuranceDate
        year
        month
        day
        createdAt
      }
      futureEvents {
        id
        ownerId
        eventName
        eventDescription
        eventOccuranceDate
        year
        month
        day
        createdAt
      }
    }
  }
`;

export default GET_CLIENTS_EVENTS;