const mongoose = require('mongoose');

const messageScheme = new mongoose.Schema({
    message: {
        type: String,
        require: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    users: Array

}, {
    timestamps: true
});

module.exports = mongoose.model("Message", messageScheme);