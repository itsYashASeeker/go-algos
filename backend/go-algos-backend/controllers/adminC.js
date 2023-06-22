const User = require("../models/user");
const Feedback = require("../models/feedback");
const bcrypt = require("bcrypt");
const generateToken = require("./genToken");
var XLSX = require("xlsx");

const LoginAdmin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(402).json({ error: ["Please fill all fields"] });
    }
    const userExists = await User.findOne({ email: email, isAdmin: true });
    if (userExists) {
        if (await bcrypt.compare(password, userExists.password)) {
            try {
                var token = generateToken(userExists._id);
                res
                    .status(202)
                    .cookie(
                        "ttoken", token,
                        {
                            sameSite: "strict",
                            maxAge: 24 * 60 * 60 * 1000,
                            httpOnly: true,
                            // secure: true
                        }
                    ).send("Http only Cookie is set")
            } catch (error) {
                res.status(402).json({ error: ["Error in saving cookies"] });
            }
        }
        else {
            res.status(402).json({ error: ["Wrong credentials"] });
        }
    }
    else {
        res.status(402).json({ error: ["Email id not registered"] });
    }

}

const RegisterAdmin = async (req, res) => {
    const { name, email, username, password } = req.body;
    if (!name || !email || !username || !password) {
        res.status(402).json({ error: ["Please fill all fields"] })
    }
    const userExists = await User.findOne({ $or: [{ email: email }, { username: username }] });
    if (userExists) {
        if (userExists.username === username) {
            console.log("username");
            return res.status(422).json({ error: ["Username already exists"] });

        }
        else if (userExists.email === email) {
            console.log("email");
            return res.status(422).json({ error: ["Email id already registered"] });
        }
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        username,
        password: hashedPassword,
        isAdmin: true,
    });

    if (newUser) {
        var token = generateToken(newUser._id);
        res
            .status(202)
            .cookie(
                "ttoken", token,
                {
                    sameSite: "strict",
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    // secure: true
                }
            ).send("Http only Cookie is set")
    }
    else {
        res.status(402).json({ "error": ["Some error occurred in database! Please try again!"] });
    }

}

const adminDash = async (req, res) => {
    try {
        const feedData = await Feedback.find({}, "-_id -__v")
            .populate("userId", "-_id -password -__v");

        res.status(200).send(feedData);
    } catch (error) {
        return res.status(422).json({ error: ["Some error occurred in fetching feedbacks"] });
    }

}

const exportEx = async (req, res) => {
    var wb = XLSX.utils.book_new();
    const feedData = await Feedback.find({}, "-_id -__v")
        .populate("userId", "-_id -password -__v");

    var newFD = [];
    feedData.map((el) => {
        const nfData = {
            "name": el.userId.name,
            "email": el.userId.email,
            "date": el.dateP,
            "institute": el.institute,
            "department": el.department,
            "designation": el.designation,
            "Algorithm": el.algoName,
            "Ease of understanding of concept using virtual lab": el.q1,
            "Simulation is easy and step by step": el.q2,
            "Relevant theory is provided for all experiments": el.q3,
            "Operating the website is easy and convenient": el.q4,
            "Any difficulties during performing the experiments?": el.q5,
            "Suggestions for further improvement": el.q6,
            "Experiment that can be added and not available in existing Algorithms VLAB.": el.q7
        }
        newFD.push(nfData);
    })
    // console.log(newFD);
    var temp = JSON.stringify(newFD);
    temp = JSON.parse(temp);
    var ws = XLSX.utils.json_to_sheet(temp);
    var down = "C:/Users/Yashkumar Dubey/Documents/new/backend/go-algos-backend/public/exportd.xlsx"
    XLSX.utils.book_append_sheet(wb, ws, "sheet1");
    XLSX.writeFile(wb, down);
    res.download(down);
    res.status(200).sendFile(down);

}

module.exports = { LoginAdmin, RegisterAdmin, adminDash, exportEx }