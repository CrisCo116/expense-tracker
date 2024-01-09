const typeDefs = `
type User {
    email: String
    profile: Profile
}

type FixedExpense {
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
}

type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
