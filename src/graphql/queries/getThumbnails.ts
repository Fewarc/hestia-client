import { gql } from "@apollo/client";

const GET_THUMBNAILS = gql`
  query GetThumbnails {
    getThumbnails {
      id
      offerId
      imageLink
    }
  }
`;

export default GET_THUMBNAILS;