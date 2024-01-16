import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      email
      name
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



