import { gql } from "@apollo/client";

const REMOVE_CONTACT = gql`
  mutation Mutation($contactId: Float!, $userId: Float!) {
    removeContact(contactId: $contactId, userId: $userId)
  }
`;

export default REMOVE_CONTACT;