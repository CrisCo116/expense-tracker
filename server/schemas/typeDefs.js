const typeDefs = `
type User {
    email: String
    profile: Profile
}

type FixedExpense {
    id: ID!
    description: String!
    amount: Float!
    frequency: String!
    dueDate: String
    category: String
    userId: ID!
  }

  input AddFixedExpenseInput {
    description: String
    amount: Float
    frequency: String
    dueDate: String
    category: String
    userId: ID!
  }

  input UpdateFixedExpenseInput {
    id: ID!
    description: String
    amount: Float
    frequency: String
    dueDate: String
    category: String
    userId: ID
  }

type Income {
    source: String
    incomeAmount: Float
    frequency: String
}

type Profile {
    firstName: String
    lastName: String
    occupation: String
    fixedExpenses: [FixedExpense]
    incomes: [Income]
}

type Query {
    users: [User]
}

type Mutation {
    signout: String
    signup(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFixedExpense(input: AddFixedExpenseInput!): FixedExpense
    updateFixedExpense(input: UpdateFixedExpenseInput!): FixedExpense
    deleteFixedExpense(id: ID!): String
}

type Auth {
    token: ID
    user: User
}
`;

module.exports = typeDefs;
