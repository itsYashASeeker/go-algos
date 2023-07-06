const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    institute: {type: String, required: true},
    department: { type: String, required: true },
    designation: { type: String, required: true },
    dateP: { type: String, required: true },
    algoName: { type: String, required: true },
    q1: { type: String, required: true },
    q2: { type: String, required: true },
    q3: { type: String, required: true },
    q4: { type: String, required: true },
    q5: { type: String, required: true },
    q6: { type: String },
    q7: { type: String }
}, {
    timestampes: { createdAt: 'createdDate', updatedAt: 'updatedDate' }
});

const feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = feedback;