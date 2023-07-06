const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/dbAoaVlab", {
            useNewUrlParser: true,
        });
        console.log("Database connected");
    }
    catch (err) {
        console.log("Error");
    }
}

module.exports = connectDB;