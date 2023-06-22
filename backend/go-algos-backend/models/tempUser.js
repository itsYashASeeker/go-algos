const mongoose = require("mongoose");

const tuserSchema = mongoose.Schema({
    name: { type: String },
    email: { unique: true, type: String },
    username: { unique: true, type: String },
    password: { type: String },
    isAdmin: { default: false, type: Boolean },
    tokeng: { unique: true, type: String },
    expireT: { type: String },
    createdAt: { type: Date, expires: "30m", default: Date.now }
    // }, {
    //     timestampes: {
    //         createdAt: { type: Date, expires: "1m", default: Date.now },
    //         updatedAt: 'updatedDate'
    //     }
});

const tuser = mongoose.model("Tempuser", tuserSchema);

module.exports = tuser;