import { gql } from "@apollo/client";

const CRAETE_NEW_OFFER = gql`
  mutation Mutation($files: [Upload]!, $lng: Float!, $lat: Float!, $address: String!, $negotiable: Boolean!, $currency: String!, $price: Float!, $area: Float!, $furnished: Boolean!, $category: String!, $offerType: String!, $description: String!, $title: String!, $numberOfRooms: Float, $floor: Float) {
    createNewOffert(files: $files, lng: $lng, lat: $lat, address: $address, negotiable: $negotiable, currency: $currency, price: $price, area: $area, furnished: $furnished, category: $category, offerType: $offerType, description: $description, title: $title, numberOfRooms: $numberOfRooms, floor: $floor) {
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
      createdAt
      updatedAt
    }
  }
`;

export default CRAETE_NEW_OFFER;