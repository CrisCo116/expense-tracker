const { Schema, model } = require('mongoose');

const fixedExpenseSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    frequency: {
        type: String,
        required: true,
        enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
    },
    dueDate: {
        type: Date,
    },
    category: {
        type: String,
        enum: ['Mortgage', 'Rent', 'Food', 'Utilities', 'Transportation', 'Entertainment', 'Health', 'Shopping', 'Other'],
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const FixedExpense = model('FixedExpense', fixedExpenseSchema);

module.exports = FixedExpense;

