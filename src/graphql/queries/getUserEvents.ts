import { gql } from "@apollo/client";

const GET_USER_EVENTS = gql`
  query GetUserEvents($year: Float!, $month: Float!, $day: Float!, $userId: Float!) {
    getUserEvents(year: $year, month: $month, day: $day, userId: $userId) {
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

export default GET_USER_EVENTS;