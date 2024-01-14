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

export const ADD_EXPENSE = gql`
  mutation AddExpense($input: AddFixedExpenseInput!) {
    addFixedExpense(input: $input) {
      id
      description
      amount
      frequency
      dueDate
      category
      userId
    }
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation UpdateExpense($input: UpdateFixedExpenseInput!) {
    updateFixedExpense(input: $input) {
      id
      description
      amount
      frequency
      dueDate
      category
      userId
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($id: ID!) {
    deleteFixedExpense(id: $id)
  }
`;
