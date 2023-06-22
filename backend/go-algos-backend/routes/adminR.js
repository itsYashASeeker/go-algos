const express = require("express");
const authorize = require("../middleware/adminAuth");
const { LoginAdmin, RegisterAdmin, adminDash, exportEx } = require("../controllers/adminC");
const router = express.Router();

router.route("/").get((req, res) => {
    res.send("Welcome Admin");
});

router.route("/register").post(RegisterAdmin);
// router.route("/register").get((req, res) => {
//     res.send("Registration page");
// });

// router.route("/g").get(authorize, fetchUser);
router.route("/login").post(LoginAdmin);
router.route("/dash").get(authorize, adminDash);
router.route("/exportE").get(exportEx);
// router.route("/logout").post(Logout);

module.exports = router;