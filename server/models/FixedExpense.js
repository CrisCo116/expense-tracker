const { Schema, model } = require('mongoose');

const fixedExpenseSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    expenseAmount: {
        type: Number,
        required: true,
    },
    frequency: {
        type: String,
        required: true,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },

});

const FixedExpense = model('FixedExpense', fixedExpenseSchema);

module.exports = FixedExpense;

