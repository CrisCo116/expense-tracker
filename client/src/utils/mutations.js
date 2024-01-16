import { gql } from '@apollo/client';

export const SIGN_UP = gql`
mutation Signup($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    token
    user {
      _id
      email
      name
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
  mutation addIncomeSource($user_id: ID!, $source: String!, $incomeAmount: Float!) {
    addIncomeSource(user_id: $user_id, source: $source, incomeAmount: $incomeAmount) {
      source
      incomeAmount
      frequency
    }
  }
`;

export const ADD_EXPENSE = gql`
mutation addFixedExpense($user_id: ID!, $description: String!, $expenseAmount: Float!) {
  addFixedExpense(user_id: $user_id, description: $description, expenseAmount: $expenseAmount) {
    description
    expenseAmount
    frequency
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
