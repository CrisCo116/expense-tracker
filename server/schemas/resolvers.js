const { User, FixedExpense } = require('../models');
const bcrypt = require('bcrypt');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
      users: async (_, __, context) => {
        if (context.user) {
          const user = await User.findOne({ _id: context.user._id });
          return user;
        }
        throw AuthenticationError;
      },
    },
    Mutation: {
        signup: async (parent, { email, password }) => {
        const user = await User.create({ email, password });
        const token = signToken(user);
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw AuthenticationError;
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw AuthenticationError;
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
        signout: (parent, args, context) => {
            return new Promise((resolve, reject) => {
                context.user = null;
                resolve({
                    message: 'Successfully signed out'
                });
            });
        },
        addFixedExpense: async (_, { input }) => {
            try {
              const newFixedExpense = new FixedExpense(input);
              await newFixedExpense.save();
              return newFixedExpense;
            } catch (error) {
              console.error(error);
              throw new Error('Error creating fixed expense');
            }
          },
          updateFixedExpense: async (_, { input }) => {
            try {
              const updatedFixedExpense = await FixedExpense.findByIdAndUpdate(
                 _id,
                { $set: input },
                { new: true }
              );
              return updatedFixedExpense;
            } catch (error) {
              console.error(error);
              throw new Error('Error updating fixed expense');
            }
          },
          deleteFixedExpense: async (_, { _id }) => {
            try {
              const deletedFixedExpense = await FixedExpense.findByIdAndDelete(
                _id
              );
              return deletedFixedExpense;
            } catch (error) {
              console.error(error);
              throw new Error('Error deleting fixed expense');
            }
          }
    },
};

module.exports = resolvers;
