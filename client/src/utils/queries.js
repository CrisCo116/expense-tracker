import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      email
      fixedExpenses {
        description
        frequency
        dueDate
        category
      }
      incomes {
        source
        incomeAmount
        frequency
      }
    }
  }
`;



