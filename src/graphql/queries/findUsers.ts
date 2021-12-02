import { gql } from "@apollo/client";

const FIND_USERS = gql`
  query FindUsers($userId: Float!, $searchValue: String!) {
    findUsers(userId: $userId, searchValue: $searchValue) {
      id
      login
      email
      role
      firstName
      lastName
    }
  }
`;

export default FIND_USERS;