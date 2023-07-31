const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/userR");
const adminRoutes = require("./routes/adminR");
const cors = require("cors");
const path = require("path");


const app = express();
const port = 5013;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
connectDB();


app.use("/y/user", userRoutes);
app.use("/y/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Hello User");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
