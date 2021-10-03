const express = require("express");
const {register, login}= require("../controllers/AuthController");

const router = express.Router();

//router.route("/").get(getUser);
router.route("/register").post(register);
router.route("/login").post(login)

module.exports = router;