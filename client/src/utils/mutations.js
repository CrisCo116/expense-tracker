import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        _id
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

export const ADD_INCOME_SOURCE = gql`
  mutation addIncomeSource($source: String!, $incomeAmount: Float!) {
    addIncomeSource(source: $source, incomeAmount: $incomeAmount) {
      source
      incomeAmount
      frequency
    }
  }
`;
