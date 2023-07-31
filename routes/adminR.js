const express = require("express");
const authorize = require("../middleware/adminAuth");
const { LoginAdmin, RegisterAdmin, adminDash, exportEx, fetchUsers, fetchAdmins } = require("../controllers/adminC");
const router = express.Router();

router.route("/").get((req, res) => {
    res.send("Welcome Admin");
});

router.route("/register").post(RegisterAdmin);
router.route("/login").post(LoginAdmin);

router.route("/auth").get(authorize, (req, res) => {
    res.send("Authorized!");
});
router.route("/dash").get(authorize, adminDash);
router.route("/exportE").get(exportEx);
router.route("/dash/user-details").get(authorize, fetchUsers);
router.route("/dash/fetch-admins").get(authorize, fetchAdmins);
// router.route("/logout").post(Logout);

module.exports = router;