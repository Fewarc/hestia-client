import { gql } from "@apollo/client";

const FIND_USER_CONTACTS = gql`
  query Query($userId: Float!, $searchValue: String!) {
    findUserContacts(userId: $userId, searchValue: $searchValue) {
      id
      login
      email
      role
      firstName
      lastName
    }
  }
`;

export default FIND_USER_CONTACTS;