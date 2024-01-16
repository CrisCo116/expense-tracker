const typeDefs = `
  type Income {
    source: String!
    incomeAmount: Float!
    frequency: String!
  }

  type FixedExpense {
    description: String!
    amount: Float!
    frequency: String!
    dueDate: String
    category: String
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
    addIncomeSource(user_id: ID! source: String!, incomeAmount: Float!): Income
    addFixedExpense(input: FixedExpenseInput): FixedExpense
    updateFixedExpense(input: UpdateFixedExpenseInput): FixedExpense
    deleteFixedExpense(_id: ID!): FixedExpense
  }

  input incomeInput {
    source: String!
    incomeAmount: Float!
    frequency: String!
  }

  input FixedExpenseInput {
    description: String!
    amount: Float!
    frequency: String!
    dueDate: String
    category: String
  }

  input UpdateFixedExpenseInput {
    _id: ID!
    description: String
    amount: Float
    frequency: String
    dueDate: String
    category: String
  }

  type Message {
    message: String
  }
`;

module.exports = typeDefs;


