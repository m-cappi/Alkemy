/** @format */

const express = require("express");
const { getCategory } = require("../controllers/CategoryController");

const router = express.Router();

router.route("/").get(getCategory);

module.exports = router;
