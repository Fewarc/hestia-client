import { gql } from "@apollo/client";

const GET_OFFER_POSTS = gql`
  query GetOfferRelatedPosts($offerId: Float!) {
    getOfferRelatedPosts(offerId: $offerId) {
      id
      replyToId
      postId
      ownerId
      ownerUsername
      title
      description
      upvotes
      tags
      postedAt
      relatedOffer
    }
  }
`;

export default GET_OFFER_POSTS;