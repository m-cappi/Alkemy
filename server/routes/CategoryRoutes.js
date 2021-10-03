const express = require("express");
const { getCategory } = require("../controllers/CategoryController");
const { ProtectMiddleware } = require("../middlewares/ProtectMiddleware");

const router = express.Router();

router.route("/").get(ProtectMiddleware, getCategory);

module.exports = router;
