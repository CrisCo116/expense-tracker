const { User } = require('./User');

const resolvers = {
    Query: {
        {
            // add a query for user
            user: (parent, args, context) => {
                return context.user;
            },
        },
    },
    Mutation: {
        {
            // add a mutation for singout
            signout: (parent, args, context) => {
                return signout(parent, args, context);
            },
            // add a mutation for signup
            signup: (parent, args, context) => {
                return signup(parent, args, context);
            },
            // add a mutation for login
            login: (parent, { email, password }, context) => {
                return login(email, password);
            },
        },
    }
}

module.exports = resolvers;