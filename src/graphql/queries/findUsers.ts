import { gql } from "@apollo/client";

const FIND_USERS = gql`
  query FindUsers($searchValue: String!) {
    findUsers(searchValue: $searchValue) {
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