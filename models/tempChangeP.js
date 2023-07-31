const mongoose = require("mongoose");

const changeUserPSchema = mongoose.Schema({
    email: { unique: true, type: String },
    tokenForPass: { unique: true, type: String },
    createdAt: { type: Date, expires: "30m", default: Date.now }
});

const TempPass = mongoose.model("TempPass", changeUserPSchema);

module.exports = TempPass;