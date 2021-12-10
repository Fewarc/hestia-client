import { gql } from "@apollo/client";

const GET_ALL_EVENTS = gql`
query GetAllUserEvents($userId: Float!) {
  getAllUserEvents(userId: $userId) {
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

export default GET_ALL_EVENTS;