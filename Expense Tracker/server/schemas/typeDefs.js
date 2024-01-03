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
    user: User
}

type Mutation {
    signout: String
    signup: String
    login(email: String, password: String): String
}
`;

module.exports = typeDefs;