const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/yash", {
            useNewUrlParser: true,
        });
        console.log("Database connected");
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;