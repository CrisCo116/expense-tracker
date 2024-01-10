import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;