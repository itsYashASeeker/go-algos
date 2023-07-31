const express = require("express");
const { RegisterUser, LoginUser, fetchUser, fillFeed, Logout,
    algoP, tverExits, finallyRegU, ReqPasswordChange, cpExists, changePassword } = require("../controllers/userC");
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
router.route("/perform/algo").post(authorize, algoP);


router.route("/auth/account/verify/g").post(tverExits);
router.route("/auth/account/verify/g/do").post(finallyRegU);
router.route("/auth/account/login/forgot-password/send-mail").post(ReqPasswordChange);
router.route("/auth/account/login/forgot-password/verify-token").post(cpExists);
router.route("/auth/account/login/forgot-password/do").post(changePassword);

module.exports = router;