const { User } = require('../models');
const bcrypt = require('bcrypt');
const { signToken, AuthenticationError } = require('../utils/auth');

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
        signup: async (parent, { email, password }, context) => {
            if (!email || !password) {
                throw new Error('Email and password are required');
            }

            if (password.length < 8) {
                throw new Error('Password must be at least 8 characters');
            }

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                throw new Error('Email already in use');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                email,
                password: hashedPassword
            });

            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }, context) => {
            try {
                const user = await User.findOne({ email });

                if (!user) {
                    throw new AuthenticationError('Invalid email or password');
                }

                const isValidPassword = await user.isCorrectPassword(password);

                if (!isValidPassword) {
                    throw new AuthenticationError('Invalid email or password');
                }

                context.user = user;

                return {
                    token: signToken(user),
                    user,
                };
            } catch (error) {
                throw new AuthenticationError('Invalid email or password');
            }
        },
        signout: (parent, args, context) => {
            return new Promise((resolve, reject) => {
                context.user = null;
                resolve({
                    message: 'Successfully signed out'
                });
            });
        },
    },
};

module.exports = resolvers;
