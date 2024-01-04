const { Schema, model } = require('mongoose');

const fixedExpenseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    expenseAmount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        // enum: ['food', 'housing', 'transportation', 'clothing', 'utilities', 'insurance', 'medical', 'savings', 'personal', 'entertainment', 'miscellaneous'],
        // required: true,
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        required: true,
    },
});

const FixedExpense = model('FixedExpense', fixedExpenseSchema);

module.exports = FixedExpense;
