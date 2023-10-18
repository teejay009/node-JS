const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User:{
            type: Number,
            default: 4000
        },
        Editor: Number,
        Admin: Number
    },
    // role: String,
    // default: "User"
    // admin, Editor
    password: {
        type: String,
        required: true
    },
    refreshToken: String
})

const User = mongoose.model("user", userSchema)
module.exports = User;