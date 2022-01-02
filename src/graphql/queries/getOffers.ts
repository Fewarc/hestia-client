import gql from "graphql-tag";

const GET_OFFERS = gql`
  query GetOffers($address: String, $numberOfRooms: Float, $negotiable: Boolean, $furnished: Boolean, $category: String, $offerType: String, $areaHigh: Float, $areaLow: Float, $priceHigh: Float, $priceLow: Float, $content: String) {
    getOffers(address: $address, numberOfRooms: $numberOfRooms, negotiable: $negotiable, furnished: $furnished, category: $category, offerType: $offerType, areaHigh: $areaHigh, areaLow: $areaLow, priceHigh: $priceHigh, priceLow: $priceLow, content: $content) {
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