const { GraphQLError } = require('graphql');

const jwt = require('jsonwebtoken');


const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    }),
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;

            console.log('Authenticated user:', req.user);
            console.log('_id:', req.user._id);
        } catch (error) {
            console.log('Invalid token');
        }

        return req;
    },
    signToken: function ({ email, _id }) {
        const payload = { email, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });

    },

};