const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const FixedExpense = require('./FixedExpense');
const Income = require('./Income');

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
    name: {
        type: String,
        required: true,
    },
    fixedExpenses: [FixedExpense.schema], // Use .schema to get the schema from the model
    incomes: [Income.schema], // Use .schema to get the schema from the model
});

userSchema.pre('find', function (next) {
    this.populate('fixedExpenses');
    this.populate('incomes');
    next();
});

userSchema.pre('findOne', function (next) {
    this.populate('fixedExpenses');
    this.populate('incomes');
    next();
});

userSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        try {
            const saltRounds = 10;
            const hash = bcrypt.hashSync(this.password, saltRounds);
            this.password = hash;
            next();
        } catch (error) {
            next(new Error(error));
        }
    } else {
        next();
    }
});

userSchema.methods.isCorrectPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        return Promise.reject(new Error(error));
    }
};

const User = model('User', userSchema);

module.exports = User;
