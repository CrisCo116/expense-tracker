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
            // Validate input
            if (!email || !password) {
                throw new Error('Email and password are required');
            }
            
            if (password.length < 8) {
                throw new Error('Password must be at least 8 characters'); 
            }
            
            // Check if email is already taken
            const existingUser = await User.findOne({ email });
            
            if (existingUser) {
                throw new Error('Email already in use');
            }
            
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Create new user
            const user = await User.create({
                email,
                password: hashedPassword
            });
            
            // Return user object and token
            return {
                user,
                token: generateToken(user) 
            };
        },
        // add a mutation for login
        login: async (parent, { email, password }, context) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Invalid email or password');  
            }
        
            const isValidPassword = await user.validatePassword(password);
        
            if (!isValidPassword) {
                throw new AuthenticationError('Invalid email or password');
            }

            context.user = user;

            return user;
        },
        // add a mutation for singout
        signout: (parent, args, context) => {
            return new Promise((resolve, reject) => {
                context.user = null;
                
                resolve({
                    message: 'Successfully signed out'
                });
            });
        },

    }
}

module.exports = resolvers;