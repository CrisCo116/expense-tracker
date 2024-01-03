const { Schema, model } = require('mongoose');

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
});

const Profile = model('Profile', profileSchema);

module.exports = { Profile, profileSchema };
