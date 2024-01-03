const { Schema, model } = require('mongoose');

const incomeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    incomeAmount: {
        type: Number,
        required: true,
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        required: true,
    },
});

const Income = model('Income', incomeSchema);

module.exports = Income;
