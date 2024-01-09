import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation signUp($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
      error {
        message
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
      error {
        message
      }
    }
  }
`;