import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      email
      name
      fixedExpenses {
        description
        expenseAmount
        frequency

      }
      incomes {
        source
        incomeAmount
        frequency
      }
    }
  }
`;



