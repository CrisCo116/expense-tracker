const { Schema, model } = require('mongoose');

// Define the schema for a fixed expense.
const fixedExpenseSchema = new Schema({
    // Description of the expense (e.g., "Groceries", "Rent").
    description: {
        type: String,
        required: true,
        trim: true, // Remove whitespace from both ends of a string.
    },
    // Amount of money spent on the expense.
    amount: {
        type: Number,
        required: true,
    },
    // Frequency of the expense (e.g., "Daily", "Monthly").
    frequency: {
        type: String,
        required: true,
        enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'], // Valid values for frequency.
    },
    // Optional due date for the expense.
    dueDate: {
        type: Date,
        required: false, // Not mandatory.
    },
    // Category of the expense (e.g., "Food", "Utilities").
    category: {
        type: String,
        required: false, // Not mandatory.
        enum: ['Mortgage', 'Rent', 'Food', 'Utilities', 'Transportation', 'Entertainment', 'Health', 'Shopping', 'Other'], // Valid values for category.
    },
    // Reference to the user who owns this expense.
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Associate this expense with a User document.
    }
});

// Create the FixedExpense model using the schema.
const FixedExpense = model('FixedExpense', fixedExpenseSchema);

module.exports = FixedExpense;
