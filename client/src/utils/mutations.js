import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!, $fullName: String!) {
    addUser(username: $username, email: $email, password: $password, fullName: $fullName) {
      token
      user {
        _id
        username
      }
    }
  }
`;
