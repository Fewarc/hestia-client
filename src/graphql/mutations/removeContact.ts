import { gql } from "@apollo/client";

const REMOVE_CONTACT = gql`
  mutation RemoveContact($contactId: Float!, $removeContactUserId: Float!) {
    removeContact(contactId: $contactId, userId: $removeContactUserId) {
      id
    }
  }
`;

export default REMOVE_CONTACT;