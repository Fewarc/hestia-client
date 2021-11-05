import gql from "graphql-tag";

const LOG_IN_USER = gql`
  query Query($password: String!, $login: String!) {
    logInUser(password: $password, login: $login) {
      id
      login
      email
      role
      firstName
      lastName
      coordinates
      age
      countryCode
      rating
      agencyId
    }
  }
`

export default LOG_IN_USER;