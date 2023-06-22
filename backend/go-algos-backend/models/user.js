const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String },
    email: { unique: true, type: String },
    username: { unique: true, type: String },
    password: { type: String },
    isAdmin: { default: false, type: Boolean }
}, {
    timestampes: { createdAt: 'createdDate', updatedAt: 'updatedDate' }
});

const user = mongoose.model("User", userSchema);

module.exports = user;