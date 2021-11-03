import gql from "graphql-tag";

const insertUser = gql`
  mutation Mutation($role: String!, $password: String!, $email: String!, $login: String!) {
    insertUser(role: $role, password: $password, email: $email, login: $login) {
      id
      login
      email
      role
    }
  }
`

export default insertUser;