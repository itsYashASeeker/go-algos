const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String },
    email: { unique: true, type: String },
    username: { unique: true, type: String },
    password: { type: String },
    institute: { type: String },
    department: { type: String },
    designation: { type: String },
    algoPerformed: [{ type: String }],
    isAdmin: { default: false, type: Boolean },
    isMAdmin: { default: false, type: Boolean },
}, {
    timestampes: { createdAt: 'createdDate', updatedAt: 'updatedDate' }
});

const user = mongoose.model("User", userSchema);

module.exports = user;