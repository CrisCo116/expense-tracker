const typeDefs = `
  type Income {
    source: String!
    incomeAmount: Float!
    frequency: String!
  }

  type FixedExpense {
    description: String!
    expenseAmount: Float!
    frequency: String!
 
  }

  type User {
    _id: ID!
    email: String!
    password: String!
    name: String!
    fixedExpenses: [FixedExpense]!
    incomes: [Income]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: User
    getUser: User
    loadIncome: [ID!]!
  }  

  type Mutation {
    signup(email: String!, password: String!, name: String!): Auth
    login(email: String!, password: String!): Auth
    signout: Message
    addIncomeSource(user_id: ID!, source: String!, incomeAmount: Float!): Income
    addFixedExpense(user_id: ID!, description: String!, expenseAmount: Float! ): FixedExpense
  }

  type Message {
    message: String
  }
`;

module.exports = typeDefs;


