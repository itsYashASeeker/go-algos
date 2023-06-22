const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/user");
const Tempuser = require("../models/tempUser");
const Feedback = require("../models/feedback");
const bcrypt = require("bcrypt");
const generateToken = require("./genToken");
const nodemailer = require("nodemailer");


const createTVerf = () => {
    const referStrs = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    let token = "";
    const tCounter = Math.floor(Math.random() * 15) + 10;
    for (var i = 0; i < tCounter; i++) {
        token += referStrs[Math.floor(Math.random() * referStrs.length)];
    }
    return token;
    // try {
    //     const tExists = await Tempuser({ tokeng: token });
    //     if (tExists) {
    //         createTVerf();
    //     }
    //     else {
    //         return token;
    //     }
    // } catch (error) {
    //     return res.status(402).json({ "error": ["Error occured, Please try again"] });
    // }
}

const RegisterUser = async (req, res) => {
    const { name, email, username, password } = req.body;
    if (!name || !email || !username || !password) {
        res.status(402).json({ error: ["Please fill all fields"] })
    }
    const userExists = await User.findOne({ $or: [{ email: email }, { username: username }] });
    const tempUExists = await Tempuser.findOne({ $or: [{ email: email }, { username: username }] });
    if (userExists) {
        if (userExists.username === username) {
            return res.status(422).json({ "error": ["Username already exists"] });
        }
        else if (userExists.email === email) {
            return res.status(422).json({ "error": ["Email id already registered"] });
        }
    }
    else if (tempUExists) {
        if (tempUExists.username === username) {
            return res.status(422).json({ "error": ["Username already exists"] });
        }
        else if (tempUExists.email === email) {
            return res.status(422).json({ "error": ["Email id already registered"] });
        }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const genTVer = createTVerf();

    try {
        const newUser = await Tempuser.create({
            name,
            email,
            username,
            password: hashedPassword,
            tokeng: genTVer
        });
        const transporter = nodemailer.createTransport({
            service: "yahoo",
            auth: {
                user: process.env.userE,
                pass: process.env.userP
            }
        });
        const mailConfigs = {
            from: process.env.userE,
            to: email,
            subject: "Verify Email for Algorithm Vlab",
            text: `Hello, Please verify your account by clicking on this 
                    Link: http://localhost:5013/auth/user/email/verify/${genTVer}`
        }
        transporter.sendMail(mailConfigs, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
            }
        });
        return res.status(200).send("Verification link sent to your Email, expires in 30 minutes!");
    } catch (error) {
        return res.status(402).json({ "error": ["Error occured, Please try again"] });
    }




    // if (newUser) {
    //     var token = generateToken(newUser._id);
    //     res
    //         .status(202)
    //         .cookie(
    //             "ttoken", token,
    //             {
    //                 sameSite: "strict",
    //                 maxAge: 24 * 60 * 60 * 1000,
    //                 httpOnly: true,
    //                 // secure: true
    //             }
    //         ).send("Http only Cookie is set")
    // }
    // else {
    //     res.status(402).json({ "error": ["Some error occurred in database! Please try again!"] });
    // }

}

const finallyRegU = async (req, res) => {
    const token = req.params.token;
    const userFound = await Tempuser.find({ tokeng: token });

    if (userFound.length > 0) {
        const userUF = await User.findOne({ _id: userFound[0]._id });
        if (userUF) {
            return res.status(402).json(`<h1>Link is expired</h1>`);
        }
        else {
            await User.create({
                name: userFound[0].name,
                email: userFound[0].email,
                username: userFound[0].username,
                password: userFound[0].password
            });
            await Tempuser.deleteOne({ _id: userFound[0]._id });
            return res.status(200).send(`<h1>Email successfully verified!</h1>`);  
        }
    }
    else {
        // res.status(402).json({ "error": ["Link expired"] });
        return res.status(402).send(`<h1>Link is expired</h1>`)
    }
}

const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(402).json({ error: ["Please fill all fields"] });
    }
    const userExists = await User.findOne({ email: email, isAdmin: false });
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

const Logout = async (req, res) => {
    try {
        // res.clearCookie('ttoken');
        res
            .status(200)
            .clearCookie("ttoken")
            .send("Logout successful");
    } catch (error) {
        res.status(402).json({ "error": ["Logout unsuccessful"] });
    }

}

const fetchUser = async (req, res) => {
    res.send(req.user);
}

const fillFeed = async (req, res) => {
    const { algoName, institute, department, designation, dateP, q1, q2, q3, q4, q5, q6, q7 } = req.body;
    if (!algoName || !q1 || !q2 || !q3 || !q4 || !q5) {
        res.status(402).json({ "error": ["Please fill all fields!"] });
    }
    try {
        const feedPosted = await Feedback.create({
            userId: req.user._id,
            algoName,
            institute,
            department,
            designation,
            dateP,
            q1,
            q2,
            q3,
            q4,
            q5,
            q6,
            q7
        });
        if (feedPosted) {
            res.status(200).send("Feedback Posted!")
        }
        else {
            res.status(402).json({ "error": [""] })
        }
    } catch (error) {

    }

}

module.exports = { RegisterUser, LoginUser, fetchUser, fillFeed, Logout, finallyRegU };

