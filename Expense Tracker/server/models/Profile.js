const { Schema, model } = require('mongoose');
const { FixedExpense } = require('./FixedExpense');
const { Income } = require('./Income');

const profileSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    occupation: {
        type: String,
    },
    fixedExpenses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'FixedExpense',
        },
    ],
    incomes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Income',
        },
    ],
});

const Profile = model('Profile', profileSchema);

module.exports = { Profile, profileSchema };

