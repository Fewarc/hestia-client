import { gql } from "@apollo/client";

const GET_AGENCIES = gql`
  query GetAgencies {
    getAgencies {
      id
      login
      email
      role
      firstName
      lastName
      address
      lat
      lng
      age
      countryCode
      rating
      agencyId
      createdAt
      updatedAt
    }
  }
`;

export default GET_AGENCIES;