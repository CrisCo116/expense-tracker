import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      _id
      email
      fixedExpenses {
        description
        frequency
        dueDate
        category
        userId
      }
      incomes {
        user {
          _id
          email
        }
        source
        incomeAmount
        frequency
      }
    }
  }
`;



