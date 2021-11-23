import { gql } from "@apollo/client";

const CRAETE_NEW_OFFER = gql`
  mutation Mutation($lng: Float!, $lat: Float!, $address: String!, $negotiable: Boolean!, $currency: String!, $price: Float!, $area: Float!, $furnished: Boolean!, $category: String!, $offerType: String!, $description: String!, $title: String!, $files: [Upload!], $numberOfRooms: Float, $floor: Float) {
    createNewOffer(lng: $lng, lat: $lat, address: $address, negotiable: $negotiable, currency: $currency, price: $price, area: $area, furnished: $furnished, category: $category, offerType: $offerType, description: $description, title: $title, files: $files, numberOfRooms: $numberOfRooms, floor: $floor) {
      id
      title
      description
      price
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

export default CRAETE_NEW_OFFER;