import { gql } from "@apollo/client";

const GET_CONTACTS = gql`
  query GetContacts($userId: Float!) {
    getContacts(userId: $userId) {
      id
      login
      email
      role
      firstName
      lastName
    }
  }
`;

export default GET_CONTACTS;