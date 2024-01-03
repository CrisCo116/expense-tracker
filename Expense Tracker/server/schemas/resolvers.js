const { User } = require('../models');

const resolvers = {
    Query: {
        users: async (parent, args, context) => {
            try {
                const allUsers = await User.find({}, { email: 1, _id: 0 });
                return allUsers;
            } catch (error) {
                console.error(error);
                throw new Error('Failed to fetch users');
            }
        },
    },
    Mutation: {

        // add a mutation for signup
        signup: async (parent, { email, password }, context) => {
            const user = await User.create({ email, password });
            return user;
        },
        // add a mutation for login
        login: async (parent, { email, password }, context) => {
            const user = await User.findOne({ email });

            if (!user || user.password !== password) {
                throw new Error('Invalid email or password');
            }

            context.user = user;

            return user;
        },
        // add a mutation for singout
        signout: (parent, args, context) => {
            return signout(parent, args, context);
        },

    }
}

module.exports = resolvers;