import { gql } from "@apollo/client";

const GET_OFFER_DETAILS = gql`
  query GetOfferDetails($offerId: Float!) {
    getOfferDetails(offerId: $offerId) {
      id
      title
      description
      price
      ownerId
      category
      furnished
      area
      floor
      numberOfRooms
      currency
      negotiable
      address
      agencyId
      agentId
      offerType
      lat
      lng
      uploads
      createdAt
      updatedAt
      photos {
        imageLink
      }
    }
  }
`;

export default GET_OFFER_DETAILS;