const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profileimage:{
        type: String,
        allowNull: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("users", usersSchema);