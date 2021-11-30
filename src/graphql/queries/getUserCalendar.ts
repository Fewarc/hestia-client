import { gql } from "@apollo/client";

const GET_USER_CALENDAR = gql`
  query GetUserCalendar($year: Float!, $userId: Float!) {
    getUserCalendar(year: $year, userId: $userId) {
      calendar
      events {
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

export default GET_USER_CALENDAR;