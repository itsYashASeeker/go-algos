const express = require("express");
const { RegisterUser, LoginUser, fetchUser, fillFeed, Logout } = require("../controllers/userC");
const authorize = require("../middleware/userAuth");
const router = express.Router();

router.route("/").get((req, res) => {
    res.send("Welcome User");
});

router.route("/register").post(RegisterUser);
router.route("/register").get((req, res) => {
    res.send("Registration page");
});

router.route("/g").get(authorize, fetchUser);
router.route("/login").post(LoginUser);
router.route("/post/feedback").post(authorize, fillFeed);
router.route("/logout").post(Logout);

module.exports = router;