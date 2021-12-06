import { gql } from "@apollo/client";

const CREATE_NEW_EVENT = gql`
mutation CreateEvent($eventOccurance: DateTime!, $eventDescription: String!, $eventName: String!, $ownerId: Float!) {
  createEvent(eventOccurance: $eventOccurance, eventDescription: $eventDescription, eventName: $eventName, ownerId: $ownerId) {
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
`;

export default CREATE_NEW_EVENT;