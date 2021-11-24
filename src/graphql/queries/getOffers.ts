import gql from "graphql-tag";

const GET_OFFERS = gql`
  query GetOffers {
    getOffers {
      id
      title
      description
      price
      ownerId
      category
      area
      furnished
      floor
      numberOfRooms
      currency
      negotiable
      offerType
      address
      lat
      lng
      uploads
      createdAt
      updatedAt
    }
  }
`;

export default GET_OFFERS;