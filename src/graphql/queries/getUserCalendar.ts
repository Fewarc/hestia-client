import { gql } from "@apollo/client";

const GET_USER_CALENDAR = gql`
  query GetUserCalendar($userId: Float!, $year: Float!) {
    getUserCalendar(userId: $userId, year: $year) {
      calendar
      events {
        id
        ownerId
        eventName
        eventDescription
        eventOccurance
        createdAt
      }
    }
  }
`;

export default GET_USER_CALENDAR;