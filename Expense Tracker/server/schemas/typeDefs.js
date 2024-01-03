const typeDefs = `
type User {
    email: String
    profile: Profile
}

type Profile {
    firstName: String
    lastName: String
    occupation: String
}

type Query {
    users: [User]
}

type Mutation {
    signout: String
    signup(email: String, password: String): User
    login(email: String, password: String): User
}
`;

module.exports = typeDefs;