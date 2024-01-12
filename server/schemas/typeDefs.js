const typeDefs = `
  type User {
    _id: ID!
    email: String!
    fixedExpenses: [FixedExpense]
    incomes: [Income]
  }

  type FixedExpense {
    expenseAmount: Float
    description: String
    category: String
    frequency: String
  }

  input FixedExpenseInput {
    expenseAmount: Float
    description: String
    category: String
    frequency: String
  }

  type Income {
    source: String
    incomeAmount: Float
    frequency: String
  }

  input IncomeInput {
    source: String
    incomeAmount: Float
    frequency: String
  }

  type Query {
    users: [User]
    getUser(userId: ID!): User
  }

  type Mutation {
    signout: String
    signup(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addIncomeSource(source: String!, incomeAmount: Float!): Income
  }

  type Auth {
    token: ID
    user: User
  }
`;

module.exports = typeDefs;


