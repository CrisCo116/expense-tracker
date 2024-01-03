const { Schema, model } = require('mongoose');
const { Profile, profileSchema } = require('./Profile');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: profileSchema,
        default: {},
    },
});

userSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        try {
            const saltRounds = 10;
            const hash = bcrypt.hashSync(this.password, saltRounds);
            this.password = hash;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

userSchema.methods.isCorrectPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const User = model('User', userSchema);

module.exports = User;
