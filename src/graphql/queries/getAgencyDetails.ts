import { gql } from "@apollo/client";

const GET_AGENCY_DETAILS = gql`
  query GetAgencyDetails($agencyId: Float!) {
    getAgencyDetails(agencyId: $agencyId) {
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

export default GET_AGENCY_DETAILS;