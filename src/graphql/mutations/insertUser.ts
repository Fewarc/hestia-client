import gql from "graphql-tag";

const INSERT_USER = gql`
  mutation InsertUserMutation($role: String!, $password: String!, $email: String!, $login: String!) {
    insertUser(role: $role, password: $password, email: $email, login: $login)
  }
`

export default INSERT_USER;