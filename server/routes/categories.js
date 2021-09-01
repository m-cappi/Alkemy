/** @format */

var express = require("express");
var router = express.Router();
var pool = require("../pool.js");


router.get("/", async function (req, res, next) {
    //SELECT
});
router.post("/", async (req, res, next) => {
    //INSERT
});



module.exports = router;