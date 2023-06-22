const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authorize = async (req, res, next) => {
    if (req.headers.cookie) {
        var token = req.headers.cookie.split("ttoken=")[1];
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decodedToken.id).select("-password");
            next();
        } catch (error) {
            res.status(402).json({ "error": ["Some error occured while authenticating user"] })
        }
    }
    else {
        res.status(402).json({ "error": ["You are not authorized"] });
    }
}

module.exports = authorize;

